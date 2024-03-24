import { expect } from "chai";
import { fizzbuzz } from "@sut/fizzbuzz";

describe("fizzbuzz", () => {
  context("50以下の場合", () => {
    context("3の倍数の場合", () => {
      it("Fizzが出力される", () => {
        expect(fizzbuzz(3)).to.equal("Fizz");
      });
    });

    context("5の倍数の場合", () => {
      it("Fizzが出力される", () => {
        expect(fizzbuzz(5)).to.equal("Buzz");
      });
    });

    context("3の倍数かつ5の倍数の場合", () => {
      it("Fizzが出力される", () => {
        expect(fizzbuzz(15)).to.equal("FizzBuzz");
      });
    });

    context("3の倍数でも5の倍数でもない場合", () => {
      it("値がそのまま出力される", () => {
        expect(fizzbuzz(1)).to.equal("1");
      });
    });
  });

  context("51以上の場合", () => {
    it("入力値の制限によるエラーが発生する", () => {
      expect(() => fizzbuzz(51)).to.throw(
        Error,
        "50以下の値を入力してください"
      );
    });
  });
});
