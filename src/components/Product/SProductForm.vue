<template>
    <div>
        <div v-html="form"></div>
    </div>
</template>

<script>
	import { Vue, Component } from 'vue-property-decorator';

	export default @Component({
		name: "SProductForm"
	})

	class ProductForm extends Vue{
		form = null;

		async mounted(){
			const { data } = await axios.get('https://forms.biznestream.biz/api/v1/forms/5a8df5230213ed00dfad9849/code');
			this.form = data
		}
	}
</script>

<style scoped>

</style>