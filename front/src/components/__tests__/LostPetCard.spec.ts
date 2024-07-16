import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LostPetCard from '../ui/LostPetCard.vue'
import { type LostCats } from '../../types/pets'

describe('LostPetCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof LostPetCard>>

  const pet: LostCats = {
    id: 4,
    name: 'cat name',
    gender: 'gender',
    image_url: 'img/path',
    color: 'color',
    description: 'description',
    department_number: 33,
    breed: 'europeen'
  }

  wrapper = mount(LostPetCard, {
    props: {
      pet: pet
    }
  })

  describe('LostPetCard props', () => {
    it('should have pet props', () => {
      expect(wrapper.props().pet).toBeTypeOf('object')
    })
  })
})
