<template>
	<div id="guitar" class="guitar active">
		<div class="instrument-view fretboard">
			<div class="tuners">
				<div class="fret fretnumber">
					Fretno.
				</div>
				<div v-for="(tuner, stringNumber) in settings.tuners" class="tuner">
					<span class="select-list-icon"></span>
					<select v-model="tuner.number" class="string">
						<option v-for="note in $parent.notes" v-bind:value="note.number">{{note.name}}</option>
					</select>
					<div class="fret first-fret">
						<fret v-bind:fret-number="1" v-bind:tuner-number="tuner.number" v-bind:string-number="stringNumber" v-bind:selected-key="$parent.selectedKey"></fret>
					</div>
				</div>

			</div> 
			<div class="frets">
				<div v-if="fret > 1" v-for="fret in settings.frets" class="fret fretnumber">
					{{ fret - 1 }}
				</div>
				<div v-for="(tuner, stringNumber) in settings.tuners" class="string">
					<div v-if="fret > 1" v-for="fret in settings.frets" class="fret" v-bind:class="{'first-fret': fret == 1}">
						<fret v-bind:fret-number="fret" v-bind:tuner-number="tuner.number" v-bind:string-number="stringNumber" v-bind:selected-key="$parent.selectedKey"></fret>
					</div>
				</div>
			</div> 
		</div>
	</div>
</template>



<script>

import Fret from './guitar/Fret.vue';

export default {
	name: 'Guitar',
	components: {
		fret: Fret
	},
	props: ['settings']
}
</script>

<style lang="scss">
.fretboard {
	position: relative;
	.tuners {
		position: absolute;
		width: 110px;
		.fretnumber{
			border: none;
		}
		select{
			width: 16px;
		}
	}
	.tuner {
		height: 35px;
		border: none;
		.fret{
			border: none;
			display: inline-block;
		}
		select{
			display: inline-block;
		}
		.select-list-icon{
			&:before{
				display: inline-block;
				font-family: FontAwesome;
				content: "\F078";
				width: 35px;
				height: 35px;
				text-align: center;
			}
			+ select {
				appearance: none;
				-moz-appearance: none;
				-webkit-appearance: none;
				width: 35px;
				height: 35px;
				margin-left: -40px;
				margin-right: -5px;
				opacity: 0;
			}
		}
	}
	.frets {
		margin-left: 110px;
		white-space: nowrap;
		overflow-x: auto;
	}
	.fret {
		width: 70px;
		display: inline-block;
		border-left: 1px solid #CCC;
		text-align: center;
		line-height: 35px;
		&.fretnumber{
			border-left: 1px solid transparent;
		}
	}

}
</style>
