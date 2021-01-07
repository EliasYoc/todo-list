const $formulario = document.getElementById("formulario"),
    $listaTareas = document.getElementById("lista-tareas"),
    $template = document.getElementById("template").content,
    $fragment = document.createDocumentFragment();
let tareas = {
    // 1609904550700:{
    //     id:1609904550700,
    //     texto: "Tarea elias",
    //     estado: false
    // },
    // 1609904579250:{
    //     id:1609904579250,
    //     texto: "texto 2",
    //     estado: false
    // }
};
// console.log(Date.now())
document.addEventListener("DOMContentLoaded", e => {
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    pintarTareas();
})

const btnAccion = (e) => {
    //console.log(e.target) //o e.target.matches(".fa-check.circle")
    if (e.target.classList.contains('fa-check-circle')) {
        tareas[e.target.dataset.id].estado = true;
        pintarTareas()
        // console.log(tareas)
    }
    if (e.target.matches(".fa-minus-circle")) {
        //console.log("boton rojo");
        delete tareas[e.target.dataset.id];
        pintarTareas();
    }
    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false;
        pintarTareas()
        // console.log(tareas)
    }
    e.stopPropagation();
}
$listaTareas.addEventListener('click', e => {
    btnAccion(e);
})

$formulario.addEventListener("submit", e => {
    e.preventDefault()
    // console.log(e.target[0].value);
    // console.log(e.target.querySelector('input').value);
    setTarea(e);
})


const setTarea = e => {
    const $input = e.target[0];
    if ($input.value.trim() === "") {
        // console.log("vacio");
        return
    }
    const tarea = {
        id: Date.now(),
        texto: $input.value,
        estado: false
    }
    //console.log(tarea)
    tareas[tarea.id] = tarea; //desestruct {...tarea}
    $formulario.reset()
    $input.focus();
    pintarTareas();
}


const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
    if (Object.values(tareas).length === 0) {
        $listaTareas.innerHTML = `
        <div class="alert alert-dark">
            Sin tareas pendientes
        </div>
        `
        return
    }
    $listaTareas.innerHTML = '';
    Object.values(tareas).forEach(tarea => {
        const $clone = $template.cloneNode(true);//para clonar lo que hay en su interiorcon true
        $clone.querySelector("p").textContent = tarea.texto;
        if (tarea.estado) {
            // console.log($clone.querySelector('.alert'))
            $clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary');
            $clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt');
            $clone.querySelector('p').style.textDecoration = 'line-through'
        }
        $clone.querySelectorAll(".fas")[0].dataset.id = tarea.id;
        $clone.querySelectorAll(".fas")[1].dataset.id = tarea.id;
        $fragment.appendChild($clone);
    })
    $listaTareas.appendChild($fragment)
}