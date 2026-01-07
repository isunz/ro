import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const commonConfig = {
    input: 'src/index.js',
    plugins: [resolve(), commonjs()]
};

export default [
    // 1. 일반 빌드 (ro.js)
    {
        ...commonConfig,
        output: {
            name: 'ro',
            file: 'dist/ro.js',
            format: 'umd',
            exports: 'default', // require('ro') 시 default 객체를 바로 반환
            sourcemap: true
        }
    },
    // 2. 압축 빌드 (ro.min.js)
    {
        ...commonConfig,
        output: {
            name: 'ro',
            file: 'dist/ro.min.js',
            format: 'umd',
            exports: 'default',
            sourcemap: true
        },
        plugins: [...commonConfig.plugins, terser()]
    }
];