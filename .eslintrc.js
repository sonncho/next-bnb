module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    quotes: ['error', 'single'], // 싱글 쿼터 사용
    '@typescript-eslint/quotes': ['error', 'single'],
    'no-unused-var': 'off', // 사용 안한 변수 경고 중복
    'spaced-comment': 'off', // 주석을 뒤에 쓰지 말라는 경고
    '@typescript-eslint/no-unused-vars': 'warn', // 사용안한 변수는 경고
    '@jsx-a11y/control-has-associated-label': 'off', // 상호 작용하는 엘리먼트에 label을 넣는다
    'react/no-array-index-key': 'off', // key값을 index로 사용할 수 있음.
    'comma-danger': 'off', // 마지막에 ,을 넣어주지 않음.
    'arrow-body-style': 'off', // 화살표 함수 안에 return사용
    'react/no-unescaped-entities': 'off', // 문자열내에서 " ' > } 허용
    'react/prop-types': 'off', // proptypes를 사용하지 않음.
    'object-curly-newline': 'off', // { 다음 줄 바꿈을 강제로 사용하지 않음
    'react/jsx-one-expression-per-line': 'off', // 한 라인에 여러개의 JSX를 사용할 수 있음.
    'react/function-component-definition': [
      2,
      {
        namedComponents: [
          'function-declaration',
          'function-expression',
          'arrow-function',
        ],
      },
    ],
    'implicit-arrow-linebreak': 'off', // 화살표 함수 다음에 줄 바꿈을 사용할 수 있다.
    'no-shadow': 'off', // 파일 내에서 중복 이름을 사용할 수 있다.
    'operator-linebreak': 'off', // 연산자 다음 줄 바꿈을 할 수 있다.
    'react/react-in-jsx-scope': 'off', // jsx를 사용하더라도 React를 꼭 import 하지 않아도 됨.
    'react/jsx-props-no-spreading': 'off', // props를 spread할 수 있음.
    'jsx-a11y/anchor-is-valid': 'off', // next js에서는 a에 href없이 사용
    'global-require': 'off', // 함수 내에서 require사용 가능
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }], // jsx사용 가능한 확장자 설정
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }], // import시 확장장명은 사용하지 않는다.
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
