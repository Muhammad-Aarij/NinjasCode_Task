const config = {
    screens: {
        MainTabs: {
            screens: {
                Homepage: {
                    path: 'chat/homepage',
                },
                Category: {
                    path: 'chat/category',
                },
                Cart: {
                    path: 'chat/cart',
                },
            },
        },
    },
};

const linking = {
    prefixes: ['mychat://'],
    config,
};

export default linking;
