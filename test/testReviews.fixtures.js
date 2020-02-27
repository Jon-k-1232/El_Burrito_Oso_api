function makeReviewsArray() {
    return [
        {
            restaurantId: 1,
            review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            rating: 5.5
        },
        {
            restaurantId: 2,
            review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            rating: 6.8
        },
        {
            restaurantId: 3,
            review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            rating:  3.9
        },
        {
            restaurantId: 4,
            review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            rating: 9.3
        },
    ];
}

function makeMaliciousReview() {
    const maliciousReview = {
        restaurantId: 4,
        review: 'Naughty naughty very naughty <script>alert("xss");</script>',
        rating: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
    }
    const expectedReview = {
        ...maliciousReview,
        review: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        rating: 8.5
    }
    return {
        maliciousReview,
        expectedReview,
    }
}

module.exports = {
    makeReviewsArray,
    makeMaliciousReview,
}