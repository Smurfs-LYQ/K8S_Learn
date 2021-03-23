## K8S-NameSpace

### 通过命令创建名称空间

```shell
kubectl create namespace test-namespace
kubectl create ns test-namespace
```

### 查询名称空间

```shell
kubectl get ns
```

### 通过yaml文件创建名称空间

```yaml
apiVersion: v1
kind: Namespace
metadata:
	name: test-namespace
```

