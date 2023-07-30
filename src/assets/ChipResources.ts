
export type ChipValue = 1 | 5 | 25 | 50 | 100;

/**
 * A helper function to use as many chips of a specific value as possible
 * @param chipValue the chip value to use
 * @param total the amount trying to be converted to chip values
 * @param chips the array of chips used so far. This will be modified to 
 * have new chip values
 * @returns the remaining total after chipValue has been applied
 */
function tryUseChip(chipValue: ChipValue, total: number, chips: ChipValue[]): number {
    const countToUse = Math.floor(total / chipValue);
    if (countToUse) {
        chips.push(...Array<ChipValue>(countToUse).fill(chipValue));
    }
    return total - chipValue * countToUse;
}

/**
 * convert a number into a the minimum size stack of chips
 * @param amount the number to convert to chips
 * @returns an array of chip values whose sum equals the passed amount
 */
export function numToChips(amount: number): ChipValue[] {
    const chips: ChipValue[] = [];

    let remainingAmount = amount;
    remainingAmount = tryUseChip(100, remainingAmount, chips);
    remainingAmount = tryUseChip(50, remainingAmount, chips);
    remainingAmount = tryUseChip(25, remainingAmount, chips);
    remainingAmount = tryUseChip(5, remainingAmount, chips);
    remainingAmount = tryUseChip(1, remainingAmount, chips);

    return chips;
}
