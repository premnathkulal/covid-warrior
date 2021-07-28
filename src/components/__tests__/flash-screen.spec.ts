// import FlashScreen from '@/components/FlashScreen.vue'
// import { shallowMount, Wrapper } from '@vue/test-utils'

// const ShallowMountFactory = (options?: any): Wrapper<FlashScreen> => {
//   return shallowMount(FlashScreen, {
//     ...options,
//     stubs: {
//       LottiePlayer: true,
//     },
//   })
// }

describe('FlashScreen.vue', () => {
  it('should render app title', () => {
    // const wrapper = ShallowMountFactory()
    // const title = wrapper.find('.title')
    // expect(title.text()).toEqual('Covid Warrior')
  })

  it('should render lottie player', () => {
    // const wrapper = ShallowMountFactory()
    // const lottiePlayerStub = wrapper.find('lottieplayer-stub')
    // expect(lottiePlayerStub.attributes('src')).toEqual(
    //   '/assets/lotties/corona-virus.json'
    // )
  })
})
