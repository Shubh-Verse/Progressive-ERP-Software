export function numberToWords(num: number): string {

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
  
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
  
    function convert(n: number): string {
  
      if (n < 20) {
        return ones[n];
      }
  
      if (n < 100) {
        return (
          tens[Math.floor(n / 10)] +
          " " +
          ones[n % 10]
        ).trim();
      }
  
      if (n < 1000) {
        return (
          ones[Math.floor(n / 100)] +
          " Hundred " +
          convert(n % 100)
        ).trim();
      }
  
      if (n < 100000) {
        return (
          convert(Math.floor(n / 1000)) +
          " Thousand " +
          convert(n % 1000)
        ).trim();
      }
  
      if (n < 10000000) {
        return (
          convert(Math.floor(n / 100000)) +
          " Lakh " +
          convert(n % 100000)
        ).trim();
      }
  
      return "";
    }
  
    return convert(num).replace(/\s+/g, " ").trim();
  }