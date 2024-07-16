import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index'
import HomeCard from '../ui/HomeCard.vue'

describe('HomeCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof HomeCard>>

  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })

  wrapper = mount(HomeCard, {
    global: {
      plugins: [router]
    },
    props: {
      img: '../src/assets/cards/cat_home_card.jpg',
      alt: 'image chat',
      btnText: 'les chats',
      href: '/lost/cats'
    }
  })

  describe('Props', () => {
    it('should have alt props', () => {
      expect(wrapper.props().alt).toBeTypeOf('string')
      expect(wrapper.props().alt).toBe('image chat')
    })
    it('should have img props', () => {
      expect(wrapper.props().alt).toBeTypeOf('string')
      expect(wrapper.props().img).toBe('../src/assets/cards/cat_home_card.jpg')
    })
    it('should have btnText props', () => {
      expect(wrapper.props().alt).toBeTypeOf('string')
      expect(wrapper.props().btnText).toBe('les chats')
    })
    it('should have href props', () => {
      expect(wrapper.props().alt).toBeTypeOf('string')
      expect(wrapper.props().href).toBe('/lost/cats')
    })
  })
})
