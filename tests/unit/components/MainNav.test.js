import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", async () => {
    const wrapper = mount(MainNav);
    await wrapper.setData({
      company: "abc",
    });
    expect(wrapper.text()).toMatch("abc");
  });

  it("displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuText = navigationMenuItems.map((item) => item.text());
    expect(navigationMenuText).toEqual([
      "Teams",
      "Locations",
      "Life at Cambo Job",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompt user is sign in", () => {
      const wrapper = mount(MainNav);
      const loginbtn = wrapper.find("[data-test='login-button']");
      expect(loginbtn.exists()).toBe(true);
    });
  });

  describe("when user log in", () => {
    it("display profile image", async () => {
      const wrapper = mount(MainNav);
      let profileImg = wrapper.find("[data-test='profile-image']");
      expect(profileImg.exists()).toBe(false);

      const loginbtn = wrapper.find("[data-test='login-button']");
      await loginbtn.trigger("click");

      profileImg = wrapper.find("[data-test='profile-image']");
      expect(profileImg.exists()).toBe(true);
    });
  });
});
