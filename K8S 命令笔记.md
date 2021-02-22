## K8S 命令笔记

1. 获取pod资源信息

   ```shell
   # 格式
   kubectl get pod [options]
   
   options:
   -n：指定名称空间
   -o wide：显示详细信息，还可以使用yaml和json
   --show-labels：显示标签
   -l 标签名：显示包含这个标签的pod，多个标签使用 , 号分割
   -l 标签名=val：显示包含这个标签并且值=val的pod，多个标签使用 , 号分割，也可以使用 != 来表示不等于
   -l 标签名 in (val1,val2): 显示包含这个标签并且值在列表中的pod，多个标签使用 , 号分割，也可以使用not in等
   -L 标签名：显示所有pod这个标签的值，多个标签使用 , 号分割
   
   # 示例
   # 获取标签run保护nginx-test和pod-demo的pod
   kubectl get pods -l "run in (nginx-test,pod-demo)"
   ```

2. 查看资源的详细信息

   ```shell
   # 格式
   kubectl describe 资源类型 资源名
   # 命令示例
   kubectl describe node node-1
   ```

3. 查看集群信息

   ```shell
   [root@Master-1 ~]# kubectl cluster-info
   
   Kubernetes master is running at https://192.168.10.201:6443
   KubeDNS is running at https://192.168.10.201:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
   
   To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
   ```

4. 查看kubectl和api server的版本

   ```shell
   [root@Master-1 ~]# kubectl version
   Client Version: version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.4", GitCommit:"d360454c9bcd1634cf4cc52d1867af5491dc9c5f", GitTreeState:"clean", BuildDate:"2020-11-11T13:17:17Z", GoVersion:"go1.15.2", Compiler:"gc", Platform:"linux/amd64"}	# 这个是kubectl的版本
   Server Version: version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.4", GitCommit:"d360454c9bcd1634cf4cc52d1867af5491dc9c5f", GitTreeState:"clean", BuildDate:"2020-11-11T13:09:17Z", GoVersion:"go1.15.2", Compiler:"gc", Platform:"linux/amd64"}	# 这个是api server的版本
   ```

5. 调整对象对资源的需求的大小

   ```shell
   # 格式
   kubectl scale --replicas=调整的数量 资源类型 资源名
   
   # 示例，将deployment对象的nginx-deploy的调整到两个pod
   kubectl scale --replicas=2 deployment nginx-deploy
   ```

6. 改变镜像的版本，滚动升级更新

   ```shell
   # 格式
   kubectl set image 资源类型 资源名 Pod名=镜像:版本
   
   # 示例，将deployment对象的nginx-deploy的pod的镜像版本改成1.18之前是1.19.5
   kubectl set image deployment nginx-deploy nginx-deploy=nginx:1.18
   ```

7. 查看镜像的升级过程

   ```shell
   # 格式
   kubectl rollout status 资源类型 资源名
   
   # 示例, 监控上面的nginx版本变化过程
   kubectl rollout status deployment nginx-deploy
   ```

8. 镜像版本回滚

   ```shell
   # 格式
   kubectl rollout undo 资源类型 资源名 回滚的版本
   # 如果不写回滚的版本则自动回滚到上一个版本
   
   # 示例
   # 不指定版本
   kubectl rollout undo deployment nginx-deploy
   # 指定版本
   kubectl rollout undo deployment nginx-deploy --to-revision=nginx:1.14-alpine
   ```

9. 创建一个svc

   ```shell
   # 格式
   kubectl expose 资源类型 类型名 参数
   
   # 示例
   kubectl expose deploy nginx-test --port=80 --target-port=80 --name=nginx
   # 参数
   --port : 资源要暴露的端口
   --target-port : 目标暴露的端口
   --name : 给这个svc指定一个名字
   ```

10. 设置让nginx-deploy可以外部访问

   ```shell
   # 原理
   修改deployment对应的service (svc)的类型为 NodePort 
   
   # 示例
   kubectl edit svc nginx
   # 将 type 改成 NodePort
   # 修改之后可以通过 kubectl get svc 查看 TYPE 选项是否变成了 NodePort 类型，并且在 PORT(S) 选项中可以发现，多了一个动态生成的端口，这个端口就是可以外部访问的端口。
   # 可以通过访问 宿主机IP:端口 访问到
   ```

11. 获取api相关信息

    ```shell
    kubectl api-version
    ```

12. 获取yaml文件书写规范

    ```shell
    kubectl explain 资源类型
    资源类型例如:
    	pods
    	deployment
    	
    查看资源中字段的详细说明可以继续向下使用 . 来查看
    例如：kubectl explain pods.metadata
    ```

13. 给资源添加标签

    ```shell
    # 格式
    kubectl label 资源类型 资源名 key=value 参数
    
    # 示例
    kubectl label pod pod-demo run=pod-demo
    # 修改run这个label的值
    kubectl label pod pod-demo run=pod-demo --overwrite
    
    # 参数
    --overwrite : 如果想要修改对应的label的值, 可以使用下面的参数
    ```

14. 

