// A namespace for encapsulation since Exercism only allows one module.
const Parsers = (() => {
  type OutputOf<SpecificParser extends Parser<unknown>> =
    ReturnType<SpecificParser>['output']

  const sequence =
    <
      const Parsers extends readonly [
        Parser<unknown>,
        Parser<unknown>,
        ...(readonly Parser<unknown>[]),
      ],
    >(
      parsers: Parsers,
    ): Parser<SequenceOutput<Parsers>> =>
    (input) => {
      const parseResult = parsers.reduce(
        (
          results: ReturnType<
            Parser<readonly SequenceOutput<Parsers>[number][]>
          >,
          parser,
        ) => {
          const result = parser(results.remainingInput)
          return {
            remainingInput: result.remainingInput,
            output: [...results.output, result.output],
          }
        },
        { remainingInput: input, output: [] }, // `parsers` is non-empty so this is never returned
      )
      // The above `reduce` callback constructs `output` such that its
      // elements align with `Parsers`, but TypeScript doesn't know that.
      return parseResult as ParseResult<SequenceOutput<Parsers>>
    }
  type SequenceOutput<Parsers extends readonly Parser<unknown>[]> = {
    [Index in keyof Parsers]: OutputOf<Parsers[Index]>
  }

  const map = <Output, NewOutput>(
    parser: Parser<Output>,
    f: (output: Output) => NewOutput,
  ): Parser<NewOutput> => {
    const applyF = (success: ParseResult<Output>) => ({
      output: f(success.output),
      remainingInput: success.remainingInput,
    })
    return (input) => applyF(parser(input))
  }

  const oneOf =
    <Parsers extends readonly Parser<unknown>[]>(
      parsers: Parsers,
    ): Parser<OutputOf<Parsers[number]>> =>
    (input) => {
      for (const parser of parsers) {
        try {
          return parser(input)
        } catch (_) {
          // Ignore the error.
        }
      }
      throw new Error('Syntax error')
    }

  const lazy =
    <Output>(parser: () => Parser<Output>): Parser<Output> =>
    (input) =>
      parser()(input)

  const regularExpression =
    (pattern: RegExp): Parser<string> =>
    (input) => {
      const match = pattern.exec(input)
      if (match === null) {
        throw new Error('Syntax error')
      } else {
        return {
          remainingInput: input.slice(match[0].length),
          output: match[0],
        }
      }
    }

  const literal =
    <Text extends string>(
      text: Text,
      errorMessage = 'Syntax error',
    ): Parser<Text> =>
    (input) => {
      if (!input.startsWith(text)) {
        throw new Error(errorMessage)
      } else {
        return {
          remainingInput: input.slice(text.length),
          output: text,
        }
      }
    }

  const space = literal(' ')

  const integer: Parser<bigint> = map(regularExpression(/^-?[0-9]+/), BigInt)

  const operator = oneOf([
    literal('plus'),
    literal('minus'),
    literal('multiplied by'),
    literal('divided by'),
  ])

  const expression: Parser<Expression> = oneOf([
    map(
      sequence([integer, space, operator, space, lazy(() => expression)]),
      ([
        lhsOutput,
        _space1,
        operatorOutput,
        _space2,
        rhsOutput,
      ]): Expression => {
        if (typeof rhsOutput === 'bigint') {
          return [lhsOutput, operatorOutput, rhsOutput]
        } else {
          // Make it left-associative:
          const [nextOperandOutput, ...trailingExpression] = rhsOutput
          return [
            [lhsOutput, operatorOutput, nextOperandOutput],
            ...trailingExpression,
          ]
        }
      },
    ),
    integer,
  ])

  const question: Parser<Expression> = (input) => {
    // The complexity in here exists to emit the specific error messages
    // expected by the tests.

    const questionWithoutQuestionMark = map(
      sequence([literal('What is', 'Unknown operation'), space, expression]),
      ([_prefix, _space, expressionOutput]) => expressionOutput,
    )

    const { output: expressionOutput, remainingInput } =
      questionWithoutQuestionMark(input)

    try {
      return map(
        literal('?'),
        (_questionMark) => expressionOutput,
      )(remainingInput)
    } catch (_questionParseError) {
      let error
      try {
        sequence([space, oneOf([integer, operator])])(remainingInput)
        error = new Error('Syntax error')
      } catch (_fallbackParseError) {
        error = new Error('Unknown operation')
      }
      throw error
    }
  }

  // Public members of the `Parsers` namespace.
  return {
    integer,
    operator,
    expression,
    question,
  }
})()

type Operator = ReturnType<typeof Parsers.operator>['output']
type Expression = bigint | readonly [Expression, Operator, Expression]

type ParseResult<Output> = {
  readonly remainingInput: string
  readonly output: Output
}

type Parser<Output> = (input: string) => ParseResult<Output>

const evaluate = (expression: Expression): bigint => {
  if (typeof expression === 'bigint') {
    return expression
  } else {
    const [lhs, operator, rhs] = expression
    const evaluatedLhs = typeof lhs === 'bigint' ? lhs : evaluate(lhs)
    const evaluatedRhs = typeof rhs === 'bigint' ? rhs : evaluate(rhs)
    switch (operator) {
      case 'plus':
        return evaluatedLhs + evaluatedRhs
      case 'minus':
        return evaluatedLhs - evaluatedRhs
      case 'multiplied by':
        return evaluatedLhs * evaluatedRhs
      case 'divided by':
        return evaluatedLhs / evaluatedRhs
    }
  }
}

export const answer = (input: string): number => {
  const questionResult = Parsers.question(input)
  if (questionResult.remainingInput !== '') {
    // There was excess input after the question.
    throw new Error('Syntax error')
  } else {
    return Number(evaluate(questionResult.output))
  }
}
