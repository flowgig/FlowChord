<!--<template>
	<div v-html="htmlContent"></div>
</template>
-->
<script>
import * as quark from 'quark-gui';
import ChordSelect from './options/ChordSelect.vue';
import MainNavigationTemplate from "./MainNavigationTemplate.quark";


export default {
    name: 'MainNavigation',
    template: MainNavigationTemplate,
    components: {
        chordSelect: ChordSelect
    }

}
</script>

<style>
.navbar-html-content{
    margin: 0;
    display: inline-block;
    vertical-align: top;
    padding: 0;
}
.navbar-select-container{
    display: inline-block;
    padding: 0;
}

.navbar-label{
    display: none;
    font-size: 12px;
    cursor: default;

}
.navbar-select{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    height: 48px;
    width: 48px;

}
.navbar-select option{
    background-color: #f9f9f9;
    color: #333435;
    font-size: 12px;
}

@media (min-width: 420px){
    .navbar-html-content{
        padding: 5px 0;
    }
    .navbar-select-container{
        padding: 3px 4px;
    }
    .navbar-label{
        display: block;
    }
    .navbar-select{
        height: auto;
        width: auto;
    }
}

@media (min-width: 768px){
    .navbar-html-content{
        padding: 7px 0;
    }
    .navbar-select{
        font-size: 24px;
    }
    .navbar-label{
        font-size: 14px;
    }
    .navbar-select-container{
        padding: 3px 10px;
    }
}
</style>
