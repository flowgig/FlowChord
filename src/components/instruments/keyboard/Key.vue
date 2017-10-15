<template>
	<div v-bind:class="'key keycolor-' + $parent.$parent.notes[parsedKeyNumber].keycolor">
		<span>
			<label v-bind:for="'select-interval-keyboard-' + keyNumber">
				<span v-if="$parent.$parent.notes[parsedKeyNumber].selected" v-bind:class="'marker marker-color-' + halfSteps">
					<span v-if="$parent.$parent.selectedLabel == 'key'">{{ keyName }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'interval'">{{ $parent.$parent.notes[parsedKeyNumber].interval }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'halfSteps'">{{ halfSteps }}</span>
				</span>
				<span v-else class="marker no-marker">
					<span v-if="$parent.$parent.selectedLabel == 'key'">{{ keyName }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'interval'">{{ $parent.$parent.notes[parsedKeyNumber].interval }}</span>
					<span v-if="$parent.$parent.selectedLabel == 'halfSteps'">{{ halfSteps }}</span>
				</span>
			</label>
			<input v-bind:id="'select-interval-keyboard-' + keyNumber" 
			type="checkbox" 
			v-on:change="$parent.$parent.updateSelectedChord()"
			v-model="$parent.$parent.selectedHalfSteps" 
			v-bind:value="halfSteps"  />
		</span>
	</div>
</template>

<script>
export default {
	name: 'Key',
	props: ['keyNumber', 'selectedKey'],
	computed: {
		halfSteps: function(){
			let halfSteps = null;
			if((this.parsedKeyNumber - this.selectedKey) % 12 >= 0){
				halfSteps = (this.parsedKeyNumber - this.$parent.$parent.selectedKey) % 12;
			}else{
				halfSteps = (12 + this.parsedKeyNumber - this.selectedKey) % 12;
			}
			return halfSteps;
		},
		keyName: function(){
			return this.$parent.$parent.notes[this.parsedKeyNumber].name;
		},
		parsedKeyNumber: function (){
			let lowestNote = parseInt(this.$parent.settings.lowestNote);
			return (this.keyNumber + lowestNote) % 12;
		}
	},
}
</script>

<style lang="scss">
label{
	cursor: pointer;
}
</style>
