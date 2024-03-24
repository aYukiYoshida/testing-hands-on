import { expect } from "chai";
import { isHoliday } from "@sut/holiday";

describe("isHoliday", () => {
  context("土曜日の場合", () => {
    it("休日と判定される", () => {
      expect(isHoliday("2024/03/16")).to.be.true;
    });
  });

  context("日曜日の場合", () => {
    it("休日と判定される", () => {
      expect(isHoliday("2024/03/17")).to.be.true;
    });
  });

  context("祝日の場合", () => {
    it("休日と判定される", () => {
      expect(isHoliday("2024/03/20")).to.be.true;
    });
  });

  context("都民の日の場合", () => {
    it("休日と判定される", () => {
      expect(isHoliday("2024/10/01")).to.be.true;
    });
  });
});
