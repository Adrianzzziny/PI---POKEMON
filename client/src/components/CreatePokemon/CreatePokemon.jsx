import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemon, getTypes, postPokemon} from '../../redux/actions';
import styles from '../CreatePokemon/CreatePokemon.module.css'


export default function CreatePokemon() {
const dispatch = useDispatch();
// el useNavigate es basicamente un metodo del router que lo que hace es redirigirme a la ruta que yo le diga
const navigate = useNavigate()

const [errors, setErrors]= useState({})

const types = useSelector((state)=> state.types)//asi me traigo mis types
// Para crear mi persnaje necesito un formulario, el cual voy a guardarlo en un estado
console.log('types',types)

const pokemons=useSelector((state)=> state.filterPokemon)

const [input, setInput] = useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",       
    height:"",
    weight:"",           
    image:"",
    types:[], 
})
console.log(input)
// Funcion validadora la hago afuera del componente--->como BackUp
function validateForm(input){
    let errors={};
    const ReName = new RegExp(/^[A-Za-z\s]+$/g)
    // const ReUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/);
    
    if(pokemons.find(f=>f.name===input.name.toLowerCase())){
        errors.name = 'El pokemon que estas intentando crear ya existe'
    }
    if (!ReName.test(input.name)){
        errors.name = 'El nombre no debe contener números y/o caracteres especiales'
    }
    if (!input.name){
        errors.name = 'El nombre es requerido'
    }
    if (input.hp.length?input.hp< 0:input.hp=0) {
        errors.hp = 'Must be greater than 0'
    }
    if (input.attack.length?input.attack< 0:input.attack=0) {
        errors.attack = 'Must be greater than 0'
    }
    if (input.defense.length?input.defense< 0:input.defense=0) {
        errors.defense = 'Must be greater than 0'
    }
    if (input.speed.length?input.speed< 0:input.speed=0) {
        errors.speed = 'Must be greater than 0'
    }
    if (input.weight.length?input.weight< 0:input.weight=0) {
        errors.weight = 'Must be greater than 0'
    }
    if (input.height.length?input.height< 0:input.height=0) {
        errors.height = 'Must be greater than 0'
    }
    if (input.types.length > 2){
        errors.types = 'You cannot choose more than two types'
    }
    if (input.types.length < 1){
         errors.types = 'You must choose at least one type...'
    }
    // if(input.img.length&&!ReUrl.test(input.img)){
    //     errors.img = 'Enter a valid url'
    // }
    // if(input.image.length&&input.image.length){
    //     errors.image = 'The function of adding image has been temporarily disabled...'
    // }
    return errors
}
useEffect(() => {
    setErrors(validateForm(input))
}, [input])

// HandleChange-->cada vez que ejecutes esta funcion a mi estado input ademas de lo que tiene agregale el e.target.value de lo que este modificando
function handleChange(e){
    // Quiero ir guardando las cosas que el usuario va escribiendo en el input en mi estado input
        setInput({//seteame ese estado
            ...input,//traete todo lo que ya tenias
            [e.target.name]:e.target.value//e.target.name-->seteamelo en e.target.value
        })
        setErrors(validateForm({
            ...input,
            [e.target.name]:e.target.value

        })
        )
    }

// HandleCheck-->si el input esta check(si esta marcado el input. agarra mi estado y seteamelo)
function handleCheck(e){
    let checked = e.target.checked
    if(checked){
        setInput({
            ...input,
            types:[...input.types, e.target.value]
        })
    }
    if(!checked){
        setInput({
            ...input,
            types: input.types.filter(t=>t !==e.target.value)
        })
    }
}
console.log(errors)
console.log('pokes',pokemons)

// HandleSubmit
function handleSubmit(e){
    e.preventDefault()
    if(Object.keys(errors).length===0){
            dispatch(postPokemon(input))
            setInput({
                name:"",
                hp:"",
                attack:"",
                defense:"",
                speed:"",
                weight:"",
                height:"",
                img:"",
                types:[], 
            })
            alert('Pokemon creado exitosamente!')
            navigate('/home')//llevame al home este personaje creado
    }
    
    else{
        alert('Completa el formulario correctamente')
    }
}

useEffect(()=>{
dispatch(getTypes())
dispatch(getPokemon())
}, [])

return (
    <div className={styles.container}>
        <Link to='/home' className={styles.home}><button className={styles.btnBack}>Back</button></Link>
        <div className={styles.createPokemon}>
        <h1 className={styles.h1}>Create Your Pokemon</h1>
        <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
            
            <div className={styles.input}>
                <label className={styles.title}>NAME:</label>
                <input
                className={styles.placeholder}
                type='text'
                value={input.name}
                name='name'
                onChange={(e)=>handleChange(e)}
                />{errors.name && (
                    <p>{errors.name}</p>
                )}
            </div>
            <div className={styles.input}>
                <label className={styles.title}>HP:</label>
                <input
                className={styles.placeholder}
                type='number'
                value={input.hp}
                name='hp'
                autoComplete='off'
                onChange={(e)=>handleChange(e)}
                />{errors.hp && (
                    <p>{errors.hp}</p>
                )}
            </div>
            <div className={styles.input}>
                <label  className={styles.title}>ATTACK:</label>
                <input
                className={styles.placeholder}
                type='number'
                value={input.attack}
                name='attack'
                autoComplete='off'
                onChange={(e)=>handleChange(e)}
                />{errors.attack && (
                    <p>{errors.attack}</p>
                )}
            </div>
            <div className={styles.input}>
                <label className={styles.title}>DEFENSE:</label>
                <input
                className={styles.placeholder}
                type='number'
                value={input.defense}
                name='defense'
                autoComplete='off'
                onChange={(e)=>handleChange(e)}
                />{errors.defense&& (
                    <p>{errors.defense}</p>
                )}
            </div>
            <div className={styles.input}>
                <label className={styles.title}>SPEED:</label>
                <input
                className={styles.placeholder}
                type='number'
                value={input.speed}
                name='speed'
                autoComplete='off'
                onChange={(e)=>handleChange(e)}
                />{errors.speed&& (
                    <p>{errors.speed}</p>
                )}
            </div>
            <div className={styles.input}>
                <label className={styles.title}>WEIGHT:</label>
                <input
                className={styles.placeholder}
                type='number'
                value={input.weight}
                name='weight'
                autoComplete='off'
                onChange={(e)=>handleChange(e)}
                />{errors.weight&& (
                    <p>{errors.weight}</p>
                )}
            </div>
            <div className={styles.input}>
                <label className={styles.title}>HEIGHT:</label>
                <input className={styles.placeholder}
                type='number'
                value={input.height}
                name='height'
                autoComplete='off'
                onChange={(e)=>handleChange(e)}
                />{errors.height&& (
                    <p>{errors.height}</p>
                )}
            </div>
            <div className={styles.input}>
                <label  className={styles.title}>TYPES:</label> 
                <div>
                {types?.map((t)=>{
                    return(
                        <label key={t.id}><input type='checkbox' className={styles.check} value={t.name} name={t.name} onChange={(e)=>handleCheck(e)}/>{t.name}</label>
                    )
                })}
                
                </div>
                {errors.types && ( <p>{errors.types}</p> )}      
               
            </div>
            <div className={styles.input}>
                <label className={styles.title}>IMAGE:</label>
                <input
                className={styles.placeholder}
                type='text'
                value={input.image}
                name='image'
                autoComplete='off'
                onChange={(e)=>handleChange(e)}
                />{errors.image && (
                    <p>{errors.image}</p>
                )}               
            </div>
            
            <button type='submit'  className={styles.btnSubmit}>Create Pokemon</button>
        </form>
        </div>        
    </div>
)
}

