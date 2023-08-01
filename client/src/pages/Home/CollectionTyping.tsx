import useTypedCollectionItem from '../../shared/customHooks/useTypedCollectionItem';

// Array of collection items
const collectionItems = [
    'Philadelphia Union',
    'Brenden Aaronson',
    'Weston Mckennie',
];

function CollectionTyping() {
    const typedCollectionItem = useTypedCollectionItem(collectionItems);
    return (
        <div className="w-1/2 mx-auto text-center text-white text-3xl blinking-cursor">
            I collect {typedCollectionItem}
        </div>
    );
}

export default CollectionTyping;
