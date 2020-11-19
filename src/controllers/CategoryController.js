const connection = require('../database/connection');

module.exports = {

  async list(request, response) {
    const categories = await connection('category').select('*');
    return response.json(categories);
  },

  async listById(request, response) {
    // http://localhost:3333/category/1
    const { id } = request.params;

    const category = await connection('category').where({ id }).first();

    if (!category) {
      return response.status(404).send();
    }

    return response.json(category);
  },

  async save (request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400)
        .json({ error: 'Nome não informado' });
    }

    const id = await connection('category').insert({ name });
    const category = await connection('category').where({ id }).first();

    return response.status(201).json(category);
  },

  async delete (request, response) {
    const { id } = request.params;
    await connection('category').where({ id }).delete();
    return response.status(204).send();
  },

  // 
  async update (request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(400)
        .json({ error: 'Nome não informado' });
    }

    await connection('category').where({ id }).update({ name });
    const category = await connection('category').where({ id }).first();
    return response.json(category);
  }

}