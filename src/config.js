
module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://@localhost/el_burrito_oso',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://@localhost/el_burrito_oso_test',
    API_TOKEN2: process.env.API_TOKEN2
};
