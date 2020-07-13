import babel from 'rollup-plugin-babel';
import {
    uglify
} from "rollup-plugin-uglify";
const needUglify = process.argv.includes('--uglify')
export default {
    input: 'src/event-bus.ts',
    output: [{
        file: 'event-bus.js',
        format: 'umd',
        name: 'EventBus'
    }],
    plugins: [
        babel({
            "extensions": [".js", ".ts"]
        }),
        needUglify && uglify()
    ]
};