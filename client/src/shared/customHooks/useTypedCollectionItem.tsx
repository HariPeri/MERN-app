/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

// Enum for different phases
enum Phase {
    Typing,
    Pausing,
    Deleting,
}

// Constants for different times
const TYPING_TIME = 200;
const PAUSE_TIME = 1000;
const DELETING_TIME = 50;

const useTypedCollectionItem = (collection: string[]) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [phase, setPhase] = useState<Phase>(Phase.Typing);
    const [typedCollectionItem, setTypedCollectionItem] = useState<string>('');

    useEffect(() => {
        switch (phase) {
            case Phase.Typing: {
                const nextTypedCollectionItem = collection[selectedIndex].slice(
                    0,
                    typedCollectionItem.length + 1
                );

                if (nextTypedCollectionItem === typedCollectionItem) {
                    setPhase(Phase.Pausing);
                    return;
                }
                const timeout = setTimeout(() => {
                    setTypedCollectionItem(
                        collection[selectedIndex].slice(
                            0,
                            typedCollectionItem.length + 1
                        )
                    );
                }, TYPING_TIME);

                return () => clearTimeout(timeout); // cleanup function for timeout
            }
            case Phase.Deleting: {
                if (!typedCollectionItem) {
                    const nextIndex = (selectedIndex + 1) % collection.length;
                    setSelectedIndex(nextIndex);
                    setPhase(Phase.Typing);
                }
                const nextRemainingCollectionItem = collection[
                    selectedIndex
                ].slice(0, typedCollectionItem.length - 1);

                const timeout = setTimeout(() => {
                    setTypedCollectionItem(nextRemainingCollectionItem);
                }, DELETING_TIME);

                return () => clearTimeout(timeout);
            }
            case Phase.Pausing:
            default: {
                const timeout = setTimeout(() => {
                    setPhase(Phase.Deleting);
                }, PAUSE_TIME);
                return () => clearTimeout(timeout);
            }
        }
    }, [typedCollectionItem, collection, selectedIndex, phase]);

    return typedCollectionItem;
};

export default useTypedCollectionItem;
