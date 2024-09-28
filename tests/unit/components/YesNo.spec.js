import YesNo from '@/components/YesNo.vue'
import { shallowMount } from '@vue/test-utils'
const answers = {
    yes: {
        "answer": "yes",
        "forced": false,
        "image": "https://yesno.wtf/assets/yes/2.gif"
    },
    no: {
        "answer": "no",
        "forced": false,
        "image": "https://yesno.wtf/assets/no/4.gif"
    }
}
const randomAnswer = () => (Math.random() > 0.5 ? answers.yes : answers.no)

describe("YesNo.vue", () => {
    let wrapper;
    let consoleSpy;
    let getAnswerSpy;

    const mockFetch = jest.fn(() => Promise.resolve({
        json: async () => randomAnswer(),
    }));
    global.fetch = mockFetch;

    const mockAxios = {
        get: jest.fn(() => Promise.resolve({
            data: randomAnswer(),
        }))
    };

    beforeEach(() => {
        wrapper = shallowMount(YesNo, { props: { p: "value" } })
        wrapper.vm.$axios = mockAxios;
        consoleSpy = jest.spyOn(console, "log")
        getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer")
        jest.clearAllMocks();
    })

    it("should have prop", () => {
        expect(wrapper.props().p).toBe("value")
        expect(wrapper.props("p")).toBe("value")
    })

    it("should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it("should log input changes", async () => {
        const input = wrapper.find("input");
        await input.setValue("asd")
        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(getAnswerSpy).not.toHaveBeenCalled();
        expect(getAnswerSpy).toHaveBeenCalledTimes(0);
    })

    it("should getAnswer", async () => {
        expect(wrapper.vm.answer).toBe("")
        const button = wrapper.find('[data-testid="buttonGetAnswer"]');
        await button.trigger("click");
        expect(["yes", "no"]).toContain(wrapper.vm.answer);
    })
})