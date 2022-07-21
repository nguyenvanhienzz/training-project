export const showAllOnClick = (option: any, props: any) => {
    if (props.selected && props.selected.length) {
        return true;
    }
    return option.name && option.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1;
};
