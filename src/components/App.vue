<template>
	<div id="app">
		<main-navigation></main-navigation>
		<settings></settings>
		<main id="mainContent">
			<div class="main-content">
				<!--<interval-select></interval-select> -->
				
				<div class="instrument">
					<guitar v-show="isSelectedInstrument('guitar')" v-bind:settings="settings.guitar"></guitar>
				</div>
				<div class="instrument">
					<keyboard v-show="isSelectedInstrument('keyboard')" v-bind:settings="settings.keyboard"></keyboard>
				</div>
				<div v-show="alternativeChords.length">
					<span v-if="selectionType == 'chord'">Similar chords:</span>
					<span v-else-if="selectionType == 'scale'">Similar scales:</span>
					<ul style="margin: 0; padding: 0 0 0 20px">
						<li v-for="alternativeChord in alternativeChords">
							{{alternativeChord.note.name}} {{alternativeChord.chordName}}
						</li>
					</ul>
				</div>
			</div>
			<main-footer></main-footer> 
		</main>
	</div>
</template>

<script>
import * as quark from 'quark-gui';
import MainNavigation from './MainNavigation.vue';
import MainFooter from './MainFooter.vue';
import IntervalSelect from './options/IntervalSelect.vue';
import Guitar from './instruments/Guitar.vue';
import Keyboard from './instruments/Keyboard.vue';
import Settings from './options/Settings.vue';

export default {
	name: 'app',
	components: {
		mainNavigation: MainNavigation,
		mainFooter: MainFooter,
		intervalSelect: IntervalSelect,
		guitar: Guitar,
		keyboard: Keyboard,
		settings: Settings
	},
	data: function () {
		return {
			notes: require("../json/notes.json"),
			chords: require("../json/chords.json"),
			scales: require("../json/scales.json"),
			intervals: require("../json/intervals.json"),
			selectedHalfSteps: [],
			selectedChord: {},
			selectedChordName: "",
			alternativeChords: [],
			selectedKey: 0,
			selectedKeyName: "",
			selectionType: 'chord',
			selectedInstruments: ['guitar', 'keyboard'],
			selectedLabel: 'key',
			settings: {
				guitar: require("../json/settings-guitar.json"),
				keyboard: require("../json/settings-keyboard.json")
			}
		};
	},
	methods: {
		sortNumber: function(a,b) {
			return a - b;
		},
		getAlternativeChords: function (firstChordOnly) {
			let single = firstChordOnly !== undefined ? firstChordOnly : false;
			let alternativeChords = [];
			for (var keyIndex in this.notes) {
				if (keyIndex != this.selectedKey){
					let relativeKeyIndex = keyIndex-this.selectedKey;
					let relativeParsedHalfSteps = [];
					this.selectedChord.parsedHalfSteps.forEach(function(parsedHalfStep){
						let relativeParsedHalfStep = parsedHalfStep-relativeKeyIndex;
						relativeParsedHalfStep = relativeParsedHalfStep >= 0 ? relativeParsedHalfStep : relativeParsedHalfStep + 12;
						relativeParsedHalfSteps.push(relativeParsedHalfStep % 12);
					});
					relativeParsedHalfSteps.sort(this.sortNumber).join(',');

					let selection = this.getSelectedSelection();
					for (var chordName in selection){
						var is_same = selection[chordName].parsedHalfSteps.length == relativeParsedHalfSteps.length && selection[chordName].parsedHalfSteps.every(function(element, index){
							return element === relativeParsedHalfSteps[index];
						}.bind(this));
						if (is_same){
							let alternativeChord = {
								note: this.notes[keyIndex],
								chord: this.getChord(chordName),
								chordName: chordName
							};
							if (single) return alternativeChord;
							else alternativeChords.push(alternativeChord);
						}
					}
				}
			}
			return alternativeChords;
		},
		useAlternativeChordIfPossible: function (){
			let alternativeChord = this.getAlternativeChords(true);
			let hasalternativeChord = Object.keys(alternativeChord).length > 0;
			if (hasalternativeChord){
				this.selectedChord = alternativeChord.chord;
				this.selectedKeyName = alternativeChord.note.name;
				this.selectedKey = alternativeChord.note.number;
				this.selectedChordName = alternativeChord.chordName;
				this.removeCustomChord();
			}
		},
		setActiveNotes: function (event) {
			if (event !== undefined){ // Changed from selectlist
				let targetId = event.target.id;
				if (targetId == "selectKey"){
					this.selectedKeyName = event.target.options[event.target.selectedIndex].text;
				}else if(targetId == "selectChord"){
					this.selectedChordName = event.target.options[event.target.selectedIndex].text;
				}
			}
			if (this.selectedChordName == "custom"){
				this.useAlternativeChordIfPossible();
			}
			var selectedHalfSteps = [];
			this.notes.forEach(function (note, index) {
				let relativeNoteNumber = note.number - this.selectedKey + 12;
				note.interval = this.intervals[relativeNoteNumber % 12];
				note.selected = false;
			}.bind(this));
			if (this.selectedChord.parsedHalfSteps !== undefined){
				this.selectedChord.parsedHalfSteps.forEach(function (note, index) {
					this.notes[(note + this.selectedKey) % 12].selected = true;
				}.bind(this));
				this.selectedHalfSteps = this.selectedChord.parsedHalfSteps;
			}
			this.alternativeChords = this.getAlternativeChords();
		},
		updateSelectedChord: function () {
			this.selectedHalfSteps.sort(this.sortNumber).join(',');
			var isCustomChord = true;
			let selection = this.getSelectedSelection();
			for (var chordName in selection){
				if (chordName !== undefined){
					var is_same = selection[chordName].parsedHalfSteps.length == this.selectedHalfSteps.length && selection[chordName].parsedHalfSteps.every(function(element, index){
						return element === this.selectedHalfSteps[index];
					}.bind(this));
					if (is_same){
						this.selectedChordName = chordName;
						this.selectedKeyName = this.notes[this.selectedKey].name;
						this.setSelectedChord(chordName);
						isCustomChord = false;
						this.removeCustomChord();
						this.setActiveNotes();
						return;
					}
				}
			}
			if(isCustomChord){
				this.setCustomChord({halfSteps: this.selectedHalfSteps, parsedHalfSteps: this.selectedHalfSteps})
				this.selectedChordName = "custom";
				this.setSelectedChord("custom");
			}
			this.setActiveNotes();
		},
		setCustomChord: function(customChord){
			if (this.selectionType == 'chord'){
				this.chords["custom"] = customChord;
			}else if (this.selectionType == 'scale'){
				this.scales["custom"] = customChord;
			}
		},
		removeCustomChord: function(){
			if (this.selectionType == 'chord'){
				delete this.chords["custom"];
			}else if (this.selectionType == 'scale'){
				delete this.scales["custom"];
			}
		},
		isSelectedInstrument: function (instrumentName) {
			let isSelectedInstrument = false;
			this.selectedInstruments.forEach(function(selectedInstrumentName){
				if (instrumentName == selectedInstrumentName){
					isSelectedInstrument = true;
				}
			});
			return isSelectedInstrument;
		},
		setSelectedChord: function(chordName){
			this.selectedChord = this.getChord(chordName);
		},
		getChord: function(chordName){
			if (this.selectionType == 'chord'){
				return this.chords[chordName];
			}else if (this.selectionType == 'scale'){
				return this.scales[chordName];
			}
		},
		getSelectedSelection: function(){
			let selectedSelection = {};
			if (this.selectionType == 'chord'){
				selectedSelection = this.chords;
			}else if (this.selectionType == 'scale'){
				selectedSelection = this.scales;
			}
			return selectedSelection;
		}
	}
}
</script>

<style>
.instrument{
	margin-bottom: 25px;
}
</style>
