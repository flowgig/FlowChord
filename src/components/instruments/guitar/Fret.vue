<template>
	<div>
		<span>
			<label v-bind:for="'select-interval-guitar-' + stringNumber + '-' + fretNumber">
				<span v-if="$parent.$parent.notes[keyNumber].selected" v-bind:class="'marker marker-color-' + halfSteps">
					<span v-if="$parent.$parent.selectedLabel == 'key'">{{ keyName }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'interval'">{{ $parent.$parent.notes[keyNumber].interval }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'halfSteps'">{{ halfSteps }}</span>
				</span>
				<span v-else class="marker no-marker"> 
					<span v-if="$parent.$parent.selectedLabel == 'key'">{{ keyName }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'interval'">{{ $parent.$parent.notes[keyNumber].interval }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'halfSteps'">{{ halfSteps }}</span>
				</span>
			</label>
			<input v-bind:id="'select-interval-guitar-' + stringNumber + '-' + fretNumber" 
			type="checkbox" 
			v-on:change="$parent.$parent.updateSelectedChord()"
			v-model="$parent.$parent.selectedHalfSteps" 
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
