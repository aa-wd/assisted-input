module.exports = function (api) {
    const presets = [
        '@babel/preset-env',
        '@babel/preset-typescript',
    ];

    const plugins = [];

    api.cache.forever();

    return {
        presets,
        plugins
    };
}
