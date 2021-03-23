## K8S-Service

### service的3种工作模式

- userspaces
- iptables
- ipvs

### service的4种类型

- ClusterIP
  - 默认的类型，分配一个IP地址，仅用于集群内部通讯
- NodePort
  - 可用于集群外部通讯
  - 通讯路径
    - NodeIP:NodePort -> ClusterIP:ClusterPort -> PodIP:PodPort
- LoadBalancer
  - 把k8s部署在虚拟机上，而虚拟机工作在云环境中，并且虚拟机支持LBAAS的负载均衡即服务的一键调用，自动触发再创建出来一个负载均衡器
- ExternalName
  - 把集群外部的服务引入到集群内部来，在集群内部直接使用

### Headless service 无头service

- 无头service在创建的时候，将 `ClusterIP`的值设置为None，这样service在启动的时候，就不会给这个service分配IP，只能通过 域名 来访问