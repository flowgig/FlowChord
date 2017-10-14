<script>
import SettingsTemplate from "./SettingsTemplate.quark";
export default {
	name: 'Settings',
	template: SettingsTemplate
}
</script>

<style>
.settings-select-container input[type="checkbox"]  {
	appearance: checkbox;
	-moz-appearance: checkbox;
	-webkit-appearance: checkbox;
}
.open-settings-button{
	font-size: 20pt;
	display: inline-block;
	vertical-align: top;
	padding: 0 23px;
	cursor: pointer;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 2;
}
.open-settings-button:after{
	line-height: 48px;
	display: inline-block;
	font-family: FontAwesome;
	content: "\F142";
	color: #FFF;
}
.open-settings-button:hover{
	-webkit-transition: background .2s .1s;
    transition: background .2s .1s;
    background-color: rgba(158, 158, 158, 0.2);
}

.open-settings-button:active{
	background-color: #428ae1;
}

@media only screen and (min-width: 768px){
	.open-settings-button:after{
		line-height: 64px;
	}
	.open-settings-button{
		padding: 0 33px;
	}
}

</style>
