<template>
	<div id="guitar" class="guitar active">
		<div>
			<settings></settings>
		</div>
		<div class="instrument-view fretboard">
			<div class="tuners">
				<div class="fret fretnumber">
					Fretno.
				</div>
				<div v-for="(tuner, stringNumber) in settings.tuners" class="tuner">
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

	import Settings from './guitar/Settings.vue';
	import Fret from './guitar/Fret.vue';

	export default {
		name: 'Guitar',
		components: {
			settings: Settings,
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
			background-color: #FFF;
			width: 150px;
			.fretnumber{
				border: 1px solid transparent;
			}
		}
		.tuner {
			line-height: 25px;
			border: 1px solid transparent;
			border-right: none;
			.fret{
				border: none;
				display: inline-block;
			}
			select{
				display: inline-block;
			}
		}
		.frets {
			margin-left: 150px;
			white-space: nowrap;
			overflow-x: auto;
		}
		.fret {
			width: 75px;
			display: inline-block;
			border: 1px solid #CCC;
			text-align: center;
			line-height: 25px;
		}

	}
</style>
