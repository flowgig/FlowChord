<template>
	<div class="row">
		<div class="col-sm-12">
			<p>Select intervals</p>
			<span v-for="(interval, halfSteps) in $parent.intervals">
				<label v-bind:for="'select-interval-' + interval"><span v-bind:class="'marker marker-color-' + halfSteps">{{interval}}</span></label>
				<input v-bind:id="'select-interval-' + interval" type="checkbox" v-on:change="$parent.updateSelectedChord" v-model="$parent.selectedIntervals" v-bind:value="parseInt(halfSteps)" />
			</span>
		</div>
		<div class="clearfix"></div>
	</div>
</template>

<script>
	export default {
		name: 'IntervalSelect',
	}
</script>
