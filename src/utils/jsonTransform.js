export default { //公开
    jsonTransform(input, template) {
        let newJson = {}
        let jsonTemplate = template
        for (var node in jsonTemplate) {

            // console.log('jsonTemplate', node, jsonTemplate[node])
            // console.log('jsonInput', node, input[node])
            let templateNode = jsonTemplate[node]
            let inputNode
            // 如果输入是数组，直接取数组
            if (input instanceof Array) {
                inputNode = input
            } else {
                inputNode = input[node]
            }
            //初始化新对象节点
            console.log('inputNode', inputNode)
            console.log('templateNode', templateNode)
            if (templateNode.result.type === "object") {
                newJson[templateNode.mappingName] = {}
            } else if (templateNode.result.type === "array") {
                newJson[templateNode.mappingName] = []
            }
            switch (templateNode.type) {
                case 'array':
                    // 获取筛选条件
                    let filter = templateNode.filter
                    let returnCount = templateNode.result.count ? templateNode.result.count : 999999999 // 999999999不限制数量
                    // console.log('templateNode', templateNode)
                    if (filter) {
                        switch (templateNode.item.type) {
                            case 'object'://取指定key下值与keyValue相同的对象
                                // console.log('keyLable', keyLable)
                                // console.log('templateNode.return.keyValue', templateNode.return.keyValue)
                                let isContinue = true
                                for (let i = 0; i < inputNode.length && isContinue; i++) {
                                    let source = inputNode[i]

                                    // 循环filter的key
                                    for (let k = 0; k < filter.length; k++) {
                                        let keyLable = filter[k].key
                                        // console.log('input[node][i][keyLable]', input[node][i][keyLable])
                                        // 循环filter的value
                                        for (let v = 0; v < filter[k].values.length; v++) {
                                            if (source[keyLable] === filter[k].values[v]) {
                                                if (templateNode.result.type === "object") {
                                                    newJson[templateNode.mappingName] = Object.assign(newJson[templateNode.mappingName], source)
                                                } else if (templateNode.result.type === "array") {
                                                    newJson[templateNode.mappingName].push(source)
                                                }

                                                returnCount--
                                                if (returnCount < 1) {
                                                    isContinue = false
                                                    break
                                                }
                                            }
                                        }

                                    }
                                }
                                break
                        }
                    } else {
                        //如果有下级节点
                        if (templateNode.item.result) {
                            // console.log('111111')
                            // console.log('inputNode',inputNode)
                            var newArray = []
                            for (let i = 0; i < inputNode.length && returnCount > 0 && i < returnCount; i++) {
                                //在外面包一层临时的对象，为了在上面循环的时候可以找到一个节点
                                var tempTNode = {} 
                                tempTNode.tempNode = templateNode.item
                                // console.log('22222222')
                                newArray.push(this.jsonTransform(inputNode[i], tempTNode))
                            }
                            inputNode = newArray
                            // console.log('sub inputNode', inputNode)
                        }
                        // console.log('input[node]', inputNode)
                        // 处理完下级节点后汇总到当前节点
                        if (templateNode.result.type === "object") {
                            for (let i = 0; i < inputNode.length && returnCount > 0 && i < returnCount; i++) {
                                // console.log ('sub inputNode[i]',inputNode[i]['undefined'])
                                let newNode
                                if (inputNode[i]['undefined']) {
                                    newNode=inputNode[i]['undefined']
                                } else {
                                    newNode=inputNode[i]
                                }
                                newJson[templateNode.mappingName] = Object.assign(newJson[templateNode.mappingName], newNode)
                            }
                        } else if (templateNode.result.type === "array") {
                            var newArray = []
                            for (let i = 0; i < inputNode.length && returnCount > 0 && i < returnCount; i++) {
                                newArray.push(inputNode[i])
                            }
                            newJson[templateNode.mappingName] = newArray
                        }
                    }
            }
        }
        console.log('newJson', newJson)
        return newJson



    }
}