<template>
	<div>
		<span>
			<label v-bind:for="'select-interval-guitar-' + stringNumber + '-' + fretNumber">
				<span v-if="$parent.$parent.notes[keyNumber].interval" v-bind:class="'marker marker-color-' + halfSteps">
					<span v-if="$parent.settings.label == 'key'">{{ keyName }}</span>
					<span v-if="$parent.settings.label == 'interval'">{{ $parent.$parent.notes[keyNumber].interval }}</span>
					<span v-if="$parent.settings.label == 'halfSteps'">{{ halfSteps }}</span>
				</span>
				<span v-else="$parent.settings.label == 'key'"> 
					{{ keyName }}
				</span>
			</label>
			<input v-bind:id="'select-interval-guitar-' + stringNumber + '-' + fretNumber" 
			type="checkbox" 
			v-on:change="$parent.$parent.updateSelectedChord()"
			v-model="$parent.$parent.selectedIntervals" 
			v-bind:value="halfSteps"  />
		</span>
	</div>
</template>

<script>
	export default {
		name: 'Fret',
		props: ['fretNumber', 'tunerNumber', 'stringNumber', 'selectedKey'],
		computed: {
			halfSteps: function(){
				let halfSteps = null;
				if((this.fretNumber + this.tunerNumber - this.selectedKey - 1) % 12 >= 0){
					halfSteps = (this.fretNumber + this.tunerNumber - this.$parent.$parent.selectedKey - 1) % 12;
				}else{
					halfSteps = (12 + this.fretNumber + this.tunerNumber - this.selectedKey - 1) % 12;
				}
				return halfSteps;
			},
			keyNumber: function(){
				return (this.fretNumber + this.tunerNumber - 1) % 12;
			},
			keyName: function(){
				return this.$parent.$parent.notes[this.keyNumber].name;
			}
		}
	}
</script>

<style lang="scss">
	label{
		cursor: pointer;
	}
</style>
