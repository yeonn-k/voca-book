module.exports = {
    extends: [
        // ... 다른 설정
        'plugin:prettier/recommended', // Prettier 설정 추가
    ],
    rules: {
        // ... 다른 규칙
        'prettier/prettier': ['error'], // Prettier 규칙을 오류로 설정
    },
};
