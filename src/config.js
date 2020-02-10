
module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://el_burrito_oso@localhost/el_burrito_oso',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://el_burrito_oso@localhost/el_burrito_oso',
};