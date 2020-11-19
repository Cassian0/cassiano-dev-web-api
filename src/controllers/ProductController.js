const connection = require('../database/connection');

module.exports = {

  async save (request, response) {
    const { name, price, category_id } = request.body;

    if (!name) {
        return response.status(400)
            .json({ error: 'Nome não informado'});
    }

    if (!price) {
        return response.status(400)
            .json({ error: 'Preço não informado' });
    }

    const [ id ]  = await connection('product').insert({
      name, price, category_id
    });

    const product = { id, name, price, category_id };
    return response.status(201).json(product);
  },

  // /product?name=Alface
  list (request, response) {
    // select
    //   product.name,
    //   category.name as category_name,
    // from product p
    // join category c on c.id = p.category_id
    // where p.name like = '%Alface%'

    const { name } = request.query;

    const queryPromise = connection('product')
      .join('category', 'category.id', '=', 'product.category_id')
      .select([ 'product.*', 'category.name as category_name' ]);

    if (name) {
      queryPromise.where('product.name', 'like', `%${name}%`)
    }

    queryPromise.then(result => {
      return response.json(result);
    });

    // const produtcs = await connection('product');
    // return response.json(produtcs);

    // const promise = connection('product');
    // promise.then(produtcs => {
    //   return response.json(produtcs);
    // });
  },

  async listById(request, response) {
    const { id } = request.params;

    const product = await connection('product')
      .where({ id }).first();
      // .where('id', '=', id);

    if (!product) {
      return response.status(404).send();
    }

    return response.json(product);
  },

  async delete (request, response) {
    const { id } = request.params;
    await connection('product').where({ id }).delete();
    return response.status(204).send();
  },

  async update (request, response) {
    const { id } = request.params;
    const { name, price, category_id } = request.body;

    if (!name) {
      return response.status(400)
        .json({ error: 'Nome não informado' });
    }

    if (!price) {
      return response.status(400)
        .json({ error: 'Preço não informado' });
    }

    if (!category_id) {
      return response.status(400)
        .json({ error: 'Categoria não informada' });
    }

    await connection('product').where({ id }).update({ name, price, category_id });
    
    const product = { id, name, price, category_id };
    return response.json(product);
  }

}