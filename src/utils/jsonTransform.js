export default { //公开
    jsonTransform(input, template) {
        // 读取模板
        // TODO
        let newJson = {}
        // console.log(res.data)
        // 比对
        // console.log('jsonInput', input)
        let jsonTemplate = template
        for (var node in jsonTemplate) {

            // console.log('jsonTemplate', node, jsonTemplate[node])
            // console.log('jsonInput', node, input[node])
            let templateNode = jsonTemplate[node]
            switch (templateNode.type) {
                case 'array':
                    // 获取筛选条件
                    let filter = templateNode.filter
                    let returnCount = templateNode.result.count ? templateNode.result.count : 0 // 0不限制数量
                    // console.log('templateNode', templateNode)
                    if (filter) {
                        switch (templateNode.itemType) {
                            case 'object'://取指定key下值与keyValue相同的对象
                                // console.log('keyLable', keyLable)
                                // console.log('templateNode.return.keyValue', templateNode.return.keyValue)
                                let isContinue = true
                                for (let i = 0; i < input[node].length && isContinue; i++) {
                                    let source = input[node][i]
                                    // 循环filter的key
                                    for (let k = 0; k < filter.length; k++) {
                                        let keyLable = filter[k].key
                                        // console.log('input[node][i][keyLable]', input[node][i][keyLable])
                                        // 循环filter的value
                                        for (let v = 0; v < filter[k].values.length; v++) {
                                            if (source[keyLable] === filter[k].values[v]) {
                                                newJson[templateNode.mappingName] = source
                                                returnCount--
                                                if (returnCount < 0) {
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
                        var newArray = []
                        for (let i = 0; i < input[node].length && returnCount > 0 && i < returnCount; i++) {
                            newArray.push(input[node][i])
                        }
                        newJson[templateNode.mappingName] = newArray
                    }



            }
        }
        console.log('newJson', newJson)
        return newJson



    }
}