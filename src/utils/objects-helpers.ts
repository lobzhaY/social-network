export const updateObjectInArray = (items, itemProp, objPropName, newObjProps) => {
    return items.map((item) => {
        if (item[objPropName] === itemProp) {
            return {
                ...item,
                ...newObjProps,
            };
        }
        return item;
    });
};
