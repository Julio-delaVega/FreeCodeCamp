class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

class CircularDoublyLinkedList 
{
    constructor() 
    {
        this.head = null;
    }

    add(data) 
    {
        const newNode = new Node(data);

        if(this.head === null) 
        {
            this.head = newNode;
            newNode.next = newNode;
            newNode.previous = newNode;
        }
        else
        {
            const tail = this.head.previous;
            tail.next = newNode;
            newNode.previous = tail;
            newNode.next = this.head;
            this.head.previous = newNode;
        }
    }

    remove(index)
    {
        if(this.head == null || index < 0)
        {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        let current = this.head;
        if(index == 0)
        {
            if(current.next === this.head)
            {
                this.head = null;
            }
            else
            {
                const tail = this.head.previous;
                tail.next = current.next;
                current.next.previous = tail;
                this.head = tail.next;
            }
            return current.data;
        }
        let i = 0;
        do
        {
            current = current.next;
            i++;
        } while(current !== this.head && index > i);
        if(current !== this.head)
        {
            current.previous.next = current.next;
            current.next.previous = current.previous;
            return current.data;
        }
        throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    get(index)
    {
        if(index > -1 && this.head !== null)
        {
            let current = this.head;
            do
            {
                if(index == 0)
                {
                    return current.data;
                }
                current = current.next;
                index--;
            } while(current !== this.head)
        }
        return undefined;
    }

    search(val)
    {
        if(this.head === null)
        {
            return -1;
        }
        let index = 0;
        let current = this.head;
        do
        {
            if(current.data == val)
            {
                return index;
            }
            current = current.next;
            index++;
        } while(current !== this.head);
        return -1;
    }

    print()
    {
        let current = this.head;
        do
        {
            console.log(current.data);
            current = current.next;
        } while(current !== this.head);
        console.log();
    }
}

CircularDoublyLinkedList.prototype.decode = function(char)
{
    let index = this.search(char);
    let newIndex = index + 13;
    if(newIndex > 25)
    {
        newIndex -= 26;
    }
    char = this.get(newIndex);
    return char;
}

function rot13(str)
{
    let patt = /[A-Z]/;
    let newStr = "";
    for(let i = 0; i < str.length; i++)
    {
        if(patt.test(str[i]))
        {
            newStr = newStr + letterList.decode(str[i]);
        }
        else
        {
            newStr = newStr + str[i];
        }
    }
    return newStr;
}

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let letterList = new CircularDoublyLinkedList();

for(let i = 0; i < alphabet.length; i++)
{
    letterList.add(alphabet[i]);
}

console.log(rot13("SERR PBQR PNZC"));
console.log(rot13("SERR CVMMN!"));
console.log(rot13("SERR YBIR?"));
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));
