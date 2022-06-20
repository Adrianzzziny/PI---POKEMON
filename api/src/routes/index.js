const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const { getPokeByName, showAllPokemonById, addNewPokemon, getAllTypes } = require('../controller/controller.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokeByName);
router.get('/pokemon/:id', showAllPokemonById);
router.post('/pokemons', addNewPokemon);
router.get('/types', getAllTypes);

//Revisar el delete
// router.delete('/pokemons/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const pokemon = await pokemon.destroy({
//             where: { id }
//         });
//         res.status(200).json({ msg: 'Pokemon was deleted succesfully!' });
//     } catch (error) {
//         res.status(404).json({ msg: 'Pokemon could not be deleted' });
//     }
// });

module.exports = router;
