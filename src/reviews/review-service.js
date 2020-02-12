

const reviewService = {

    list(knex) {
        return knex('review').select('*')
    },



    findById(knex, id){
        return knex('review').where({id}).first('*')
    },



    insert(knex, review){
        return knex('review')
            .insert(review)
            .returning('*')
            .then(rows =>rows[0]);
    },


};


module.exports = reviewService;

