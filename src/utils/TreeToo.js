import { varEmpty, varNotEmpty, isArray, keyEmpty } from './util';


const ID_ALL = "-1";
const NODE_ALL = { id: ID_ALL, code: "all", display: "全部" };
const NODE_ALL_LEVEL1 = { id: ID_ALL, code: "all", display: "年级" };
const NODE_ALL_LEVEL2 = { id: ID_ALL, code: "all", display: "学科" };

const _findItemByProperty = (items, propKey, value) => {
    return items.filter(item => item[propKey] + '' === value + '')[0];
}


const getNodeAll = (level) => {
    let nodeAll = NODE_ALL;
    if (level === 0)
        nodeAll = NODE_ALL_LEVEL1;
    else if (level === 1)
        nodeAll = NODE_ALL_LEVEL2;
    return nodeAll;
}

const findTreeNodeFromPath = (treeRootNodes, selectedIdsPath, level) => {
    let currentLevel = 0;
    let siblings = treeRootNodes;
    let currentNode = {};
    while (currentLevel <= level) {
        if (selectedIdsPath[currentLevel] + '' === ID_ALL)
            return getNodeAll(level);
        currentNode = _findItemByProperty(siblings, "id", selectedIdsPath[currentLevel]);
        siblings = currentNode.children;
        currentLevel++;
    }
    return currentNode;
}

const getValidTreeIdFromPath = (pathArray) => {

    if (varEmpty(pathArray))
        return '';

    if (pathArray[pathArray.length - 1] !== ID_ALL)
        return pathArray[pathArray.length - 1];

    if (pathArray.length === 1)
        return '';

    return pathArray[pathArray.length - 2];
}

const getValidTreeIdFromPathStr = (pathArrayStr) => {
    return getValidTreeIdFromPathStr(pathArrayStr.split(','));
}

const getPathNameById = (id, node, currentPathName) => {
    if (!node || !node.id || !node.display) {
        return;
    }

    let newPathName = currentPathName + "-" + node.display;
    if (varEmpty(currentPathName))
        newPathName = node.display;

    if (node.id.toString() === id) {
        return newPathName;
    } else {
        let childNodes = node.children;
        if (childNodes && isArray(childNodes)) {
            for (let i = 0; i < childNodes.length; i++) {
                let cNode = childNodes[i];
                let name = getPathNameById(id, cNode, newPathName);
                if (name !== "") {
                    return name;
                }
            }
        }
    }
    return "";
}
//nodes,从context里面拿到知识树 this.context.dictionary.knowledgeTree
//id, 从数据库等地方拿到 3-2(高中数学)
//返回 高中-数学, 需要手动把-去掉,变为 高中数学.
const getFullPathNameByKtId = (nodes, id) => {
    let pathName = "";

    if (varEmpty(nodes)) {
        return "";
    }

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let name = getPathNameById(id, node, "");
        if (name !== "") {
            return name;
        }
    }
    return pathName;
}

const getNameByKtId = (nodes, id) => {
    let arr = getFullPathNameByKtId(nodes, id).split('-');
    if (varEmpty(arr))
        return '';
    return arr[arr.length - 1];
}

const getGradNameByKtId = (nodes, id) => {
    let arr = getFullPathNameByKtId(nodes, id).split('-');
    if (varEmpty(arr))
        return '';
    return arr[0];
}

const getSubjectByKtId = (nodes, id) => {
    let arr = getFullPathNameByKtId(nodes, id).split('-');
    if (varEmpty(arr))
        return '';
    return arr[1];
}

const treeIdsToNames = (tree, ids) => {
    return ids.split(',').map(id => getNameByKtId(tree, id)).join(',');
}

//将3-2(高中数学),的3拿出来,得到 0-3,
//返回 ['0-3','3-2']
const treeIdToTreeArray = (id) => {
    let grade = id.split('-')[0];
    let first = '0-' + grade;
    let result = [];
    result[0] = first;
    result[1] = id;
    return result;
};

//验证知识树,1 必须是array, 且长度长度必须 是2,不能包含-1
const validateKtTree = (value) => {
    if(value instanceof Array && value.length === 2 ){
        value.forEach(obj => {
            if(obj === '-1'){
                return false;
            }
        });
        return true;
    }
    return false;
};

const getGradeSubjectNodes = (knowledgeTree, selectedIdsPath) => {
    const level_0 = 0;
    const level_1 = 1;
    let selectedGradeNode = knowledgeTree[0];
    let selectedSubjectNode = null;

    if (selectedIdsPath.length > 0) {
        let level0Node = findTreeNodeFromPath(knowledgeTree, selectedIdsPath, level_0);
        if (!varEmpty(level0Node.children)) {
            selectedGradeNode = level0Node;
            if (selectedIdsPath.length > 1) {
                selectedSubjectNode = findTreeNodeFromPath(knowledgeTree, selectedIdsPath, level_1);
            }
            else {
                selectedSubjectNode = level0Node.children[0];
            }
        }
    }
    return [selectedGradeNode, selectedSubjectNode];
}

const getRecordTreeGrad = (knowledgeTree, record) => {
    if (keyEmpty(record, "knowledgeTreeIds"))
        return '';

    let arr = record.knowledgeTreeIds.split(',');
    if (varEmpty(arr))
        return '';
    const validNames = arr.map(id => (getGradNameByKtId(knowledgeTree, id))).filter(name => varNotEmpty(name));
    return validNames.join(',');
};

const getRecordTreeSubject = (knowledgeTree, record) => {
    if (keyEmpty(record, "knowledgeTreeIds"))
        return '';

    let arr = record.knowledgeTreeIds.split(',');
    if (varEmpty(arr))
        return '';
    const validNames = arr.map(id => (getSubjectByKtId(knowledgeTree, id))).filter(name => varNotEmpty(name));
    return validNames.join(',');
};

const getRecordTreeNames = (knowledgeTree, record) => {
    if (keyEmpty(record, "knowledgeTreeIds"))
        return '';

    let arr = record.knowledgeTreeIds.split(',');
    if (varEmpty(arr))
        return '';
    const validNames = arr.map(id => (getNameByKtId(knowledgeTree, id))).filter(name => varNotEmpty(name));
    return validNames.join(',');
}

const mapSubjectIdToName = (subjectList, subjectId) => {
    let arr = subjectList.filter(tempSubject => tempSubject.id + '' === subjectId + '');
    if (arr.length === 0)
        return '';
    return arr[0].display;
}

const mapGradeIdToName = (knowledgeTree, gradeId) => {
    let arr = knowledgeTree.filter(tempGrade => tempGrade.id.split('-')[1] + '' === gradeId + '');
    if (arr.length === 0)
        return '';
    return arr[0].display;
}

export {
    findTreeNodeFromPath, ID_ALL, getNodeAll, getValidTreeIdFromPath, getValidTreeIdFromPathStr,
    getFullPathNameByKtId, getNameByKtId, treeIdsToNames, treeIdToTreeArray,validateKtTree,
    getGradeSubjectNodes, getRecordTreeNames, getRecordTreeSubject, getRecordTreeGrad, mapSubjectIdToName,
    mapGradeIdToName
};
