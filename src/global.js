let env;

if (typeof window !== 'undefined') {
    env = window;
} else {
    env = {};
    env.navigator = {
        userAgent: ''
    }
}

module.exports = {
    global: env
}