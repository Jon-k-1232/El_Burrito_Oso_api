
const ReviewService = {
    list(knex){
        return knex('folders').select('*');
    },



    findById(knex, id){
        return knex('userreviews').where({id}).first('*')
    },



    insert(knex,folder){
        return knex('folders')
            .insert(folder)
            .returning('*')
            .then(rows => rows[0]);
    }
};

module.exports = ReviewService;