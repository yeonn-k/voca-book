/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // TailwindCSS가 적용될 파일 경로 설정
    ],
    theme: {
        extend: {
            fontFamily: {
                'gowun-regular': ['Gowun Batang', 'serif'], // Regular 스타일
                'gowun-bold': ['Gowun Batang', 'serif'], // Bold 스타일
            },
            minWidth: {
                640: '640px', // 640px 최소 너비 추가
            },
        },
    },
    plugins: [],
};
