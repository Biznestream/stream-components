<template>

    <div ref="panel" class="panel panel-default" :class="{open: active}">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a href="" class="accordion-toggle" @click.prevent="toggleOpen" accordion-transclude="heading">
                    <span>{{tab.title}}</span>
                </a>
            </h4>
        </div>
        <transition
                name="expand"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
        >
            <div v-if="active" class="panel-collapse collapse" :class="{in: active}">
                <div class="panel-body">
                    <div class="row dl-leaders">
                        <s-product-attribute
                                show-title
                                v-for="(item, index) in tab.attributes" :key="index"
                                :attribute="item"
                        >
                        </s-product-attribute>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
	import { Vue, Prop, Component } from 'vue-property-decorator';

	export default @Component({
		name: "SProductAccordion",
		components: {
		}
	})

	class SProductAccordion extends Vue {
		@Prop() tab;
		@Prop() active;

		toggleOpen(){
			this.$emit('toggleTab');
		}

		mounted(){
			const target = document.querySelector('.panel-collapse');
			target.addEventListener("webkitTransitionEnd", () => {
				alert('True')
			})
		}

		windowScroll(){
			let top = 230;
			const barHeight = document.querySelector('.list-product-images').offsetHeight;
			top += barHeight;
			window.scrollTo({
				'behavior': 'smooth',
				'left': 0,
				'top': top
			});
		}

		enter(element) {
			element.style.width = getComputedStyle(element).width;
			element.style.position = 'absolute';
			element.style.visibility = 'hidden';
			element.style.height = 'auto';
			const height = getComputedStyle(element).height;
			element.style.width = null;
			element.style.position = null;
			element.style.visibility = null;
			element.style.height = 0;
			getComputedStyle(element).height;
			setTimeout(() => {
				element.style.height = height;
			});
		}

		afterEnter(element) {
			element.style.height = 'auto';
			this.windowScroll();
		}

		leave(element) {
			element.style.height = getComputedStyle(element).height;
			getComputedStyle(element).height;
			setTimeout(() => {
				element.style.height = 0;
			});
		}

		afterLeave(element){
			this.windowScroll();
		}
	}
</script>

<style lang="scss" scoped>

    .expand-enter-active,
    .expand-leave-active {
        transition: height .4s;
        overflow: hidden;
    }

    .expand-enter,
    .expand-leave-to {
        height: 0;
    }

    a{
        text-decoration: none;
    }

</style>
