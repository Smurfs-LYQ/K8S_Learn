## K8S 对象

### 资源：对象

1. 资源类型
   - 名称空间级资源
     - workload ：工作负载型资源，运行应用程序，对外提供服务的。
       - Pod
       - ReplicaSet
       - Deployment
       - StatefulSet：有状态应用使用
       - DaemonSet ：运行为系统级守护进程
       - Job：
       - CronJon
     - 服务发现及服务均衡 ：
       - Service
       - Ingress
     - 配置与存储相关的资源 ：主要有各种各样的存储卷
       - Volume
       - CSI ：容器存储接口，可以用来扩展各种第三方的存储卷
       - 特殊类型存储卷
         - ConfigMap ：这是当配置中心使用的资源类型
         - Secret ：跟ConfigMap的功能相同，但是用来报错敏感数据
       - 将外部环境的数据输出给容器
         - DownwardAPI
   - 集群级资源：
     - Nampspace ：名称空间
     - Node ：节点资源
     - Role ：角色
     - ClusterRole ：集群角色
     - RoleBinding ：角色绑定
     - ClusterRoleBinding ：集群角色绑定
   - 元数据型资源：
     - HPA ：它能自动调整其它资源的元数据信息，比如 ReplicaSet、PodTemplate、LimitRange 等
   - 
2. 