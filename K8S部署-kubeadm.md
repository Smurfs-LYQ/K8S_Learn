## K8S 部署

### 搭建一个完整的Kubernetes集群

1. 生产环境K8S平台规划
2. 服务器硬件配置推荐
3. 官方提供三种部署方式
4. 为Etcd和APIServer自签SSL证书
5. Etcd数据库集群部署
6. 部署Master组件
7. 部署Node组件
8. 部署K8S集群网络
9. 部署Web UI（Dashboard）
10. 部署集群内部DNS解析服务（CoreDNS）

### 官方提供的三种部署方式

- minikube：主要用来自己体验着玩
  - Minikube是一个工具，可以在本地快速运行一个单节点的Kubernetes，仅用于尝试Kubernetes
  - 部署地址：https://kubernetes.io/docs/setup/learning-environment/minikube/
- kubeadm：安装方式相对比较简单，但是不知道中途都配置了哪些东西，不利于学习
  - Kubeadm也是工具，提供kubeadm init和kubeadm join，用于快速部署Kubernetes集群。
  - 部署地址：https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm
- 二进制：安装方式相对困难，但是这个更适合用在生产环境上
  - 推荐，从官方下载发行版的二进制包，手动部署每个组件，组成Kubernetes集群。
  - 下载地址：https://github.com/kubernetes/kubernetes/releases

### 安装-初始化节点

- 关闭防火墙

  ```shell
  $ systemctl stop firewalld 			# 停止防火墙服务
  $ systemctl disable firewalld		# 关闭防火墙开机启动
  $ iptables -F										# 清除iptables规则
  ```

- 关闭seLinux

  ```shell
  $ setenforce 0								# 临时关闭selinux
  $ vim /etc/selinux/config 		# 永久关闭修改配置selinux文件
  ```

- 关闭swap

  ```shell
  $ swapoff -a				# 临时关闭swap
  $ vim /etc/fstab		# 修改配置文件，永久关闭swap
  ```

- 配置节点主机名（单节点环境）

  ```shell
  $ hostnamectl set-hostname Master-1		# 通过命令行修改配置文件
  $ vim /etc/hostname										# 修改配置文件
  ```

- 配置名称解析（修改hosts文件）

  ```shell
  $ vim /etc/hosts
  ```

- 配置时间同步

  - 选择一个服务器作为服务端

    - 安装时间服务

      ```shell
      yum -y install chrony			# 一般默认都是已经安装了的
      ```

    - 修改配置文件

      ```shell
      vim /etc/chrony.conf
      ```

      ![](./images/71584408656_.pic_hd.jpg)

    - 重新启动服务

      ```shell
      systemctl restart chronyd
      systemctl enable chronyd 	# 设置开启自启动
      ```

  - 设置服务客户端

    - 安装chrony

      ```shell
      yum -y install chrony			# 一般默认都是已经安装了的
      ```

    - 修改配置文件

      ```shell
      vim /etc/chrony.conf
      ```

      ![](./images/81584409313_.pic.jpg)

    - 重启服务

      ```shell
      systemctl restart chronyd
      systemctl enable chronyd 	# 设置开启自启动
      ```

    - 检查时间是否已同步

      ```shell
      chronyc sources
      ```

      ![](./images/91584409736_.pic.jpg)

      最后一行的 Master-1 代表的是服务端机器的主机名，主机名前面如果是 `^*` 的话代表同步的没问题，如果是 `^? ` 代表时间还没同步，如果等一会时间还没同步，可能配置的有问题。

### 安装-开始部署K8S

1. 准备工作：

   1. 检查服务器之间时间是否同步，确保所有服务器的时间可以通过时间同步服务器同步

   2. 配置服务器之间域名解析，数量少可使用修改 hosts 文件的方式实现

   3. 关闭swap、selinux和(iptables/firewalld)

   4. 配置docker yum源

      ```shell
      wget -P /etc/yum.repos.d https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
      ```
      
   5. 配置kubernetes yum源

      1. 添加将镜像源

         ```shell
      vim /etc/yum.repos.d/kubernetes.repo
         ```
         
         ![image-20201207214834521](./images/image-20201207214834521.png)
   
      2. 导入gpgkey

         ```shell
   rpm --import https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
         # 安装kebelet需要导入下面这个gpgkey
      rpm --import https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
         ```
      
   6. 检查镜像源是否生效以及镜像源中是否有可用包（最后面的状态参数代表镜像源里面的包）
   
      ![image-20201207214604290](./images/image-20201207214604290.png)

2. Master, Nodes: 安装并启动kubelet、kubectl、kubeadm、docker-ce、

   ```shell
   yum -y install docker-ce kubelet kubeadm kubectl # 这里直接就安装最新版本了
   
   # 如果想安装特定的版本
   yum list 程序名 --showduplicate  # 查看程序的各个版本
   yum list available 程序名 --showduplicates  # 查看可用的程序的版本
   
   # 安装的时候只需要将版本号复制下来，在 程序名 后面加上 - 和 版本号即可
   yum -y install kubelet-1.13.12-0 kubeadm-1.13.12-0 kubectl-1.13.12-0 docker-ce-18.06.3.ce-3.el7
   
   # 注意：
   # 如果指定版本安装的话，不可以先安装kubeadm，因为他依赖与kubelet，先安装kubeadm会导致kubelet直接安装最新版本的
   ```

   ![image-20210216091934385](./images/image-20210216091934385.png)

   ```shell
   如果遇到上面这个依赖问题
   解决办法：
   	yum -y install http://mirror.centos.org/centos/7/extras/x86_64/Packages/container-selinux-2.107-3.el7.noarch.rpm
   ```

   

3. Master, Nodes：配置docker

   - 修改 Cgroup Driver

     需要将Docker 的 Cgroup Driver 修改为 systemd，不然在为Kubernetes 集群添加节点时会报如下错误：

     ```shell
     # 执行 kubeadm join 的 WARNING 信息
     [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
     ```

     目前 Docker 的 Cgroup Driver 看起来应该是这样的：

     ```shell
     docker info|grep "Cgroup Driver"
       Cgroup Driver: cgroupfs
     ```

     需要将这个值修改为 systemd ，同时我将registry替换成国内的一些仓库地址，以免直接在官方仓库拉取镜像会很慢，操作如下。

     ```shell
     cat > /etc/docker/daemon.json <<EOF
     {
         "exec-opts": ["native.cgroupdriver=systemd"],
         "log-driver": "json-file",
         "log-opts": {
         "max-size": "100m"
         },
         "storage-driver": "overlay2",
         "registry-mirrors":[
             "https://kfwkfulq.mirror.aliyuncs.com",
             "https://2lqq34jg.mirror.aliyuncs.com",
             "https://pee6w651.mirror.aliyuncs.com",
             "http://hub-mirror.c.163.com",
             "https://docker.mirrors.ustc.edu.cn",
             "https://registry.docker-cn.com"
         ]
     }
     EOF
     
     mkdir -p /etc/systemd/system/docker.service.d
     ```

   - 启动docker

     ```shell
     # 启动docker
     systemctl start docker
     
     # 开机自启
     systemctl enable docker
     ```

4. Master：kubeadm 初始化集群

   ```shell
   [root@Master-1 yum.repos.d]# kubeadm init \
   # 指定版本号，注意这里的版本号要结合自己的实际情况设置
   > --kubernetes-version=1.19.4 \
   # 指定镜像仓库，这里是添加了一个国内的镜像仓库
   > --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
   # 设置pod的IP地址范围
   > --pod-network-cidr 10.10.0.0/16 \
   # 设置Service的VIP地址范围
   > --service-cidr 10.20.0.0/16
   ```

   ```shell
   kubeadm init \
   --kubernetes-version=1.19.4 \
   --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
   --pod-network-cidr 10.10.0.0/16 \
   --service-cidr 10.20.0.0/16
   
   kubeadm init --kubernetes-version=v1.13.12 --pod-network-cidr=10.244.0.0/16 --service-cidr=10.96.0.0/12 --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers
   ```

5. Master：kubelet 配置启动

   - 查看安装kubelet生成了哪些文件

     ```shell
     rpm -ql kubelet
     ```

   - 如果swap必须要开，在 /etc/sysconfig/kubelet 文件中添加相应配置

     ```shell
     KUBELET_EXTRA_ARGS="--fail-swap-on=false"
     
     # 并在使用kubeadm初始化的时候 添加 --ignore-preflight-errors=Swap
     ```

   - 设置service默认工作模式为ipvs

     ```shell
     # 修改kubelet配置文件下面的内容
     KUBE_PROXY_MODE="ipvs"
     
     # 之后执行下面的命令，为kube-proxy开启ipvs的前提需要加载以下的内核模块
     mkdir -p  /etc/sysconfig/modules/
     cat > /etc/sysconfig/modules/ipvs.modules <<EOF
     #!/bin/bash
     modprobe -- ip_vs
     modprobe -- ip_vs_rr
     modprobe -- ip_vs_wrr
     modprobe -- ip_vs_sh
     modprobe -- nf_conntrack_ipv4
     EOF
     chmod 755 /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4
     # 使用lsmod | grep -e ip_vs -e nf_conntrack_ipv4命令查看是否已经正确加载所需的内核模块
     
     # 安装程序包
     yum -y install ipvsadm ipset
     
     # 修改ConfigMap的kube-system/kube-proxy中的config.conf，mode: “ipvs”
     kubectl edit cm kube-proxy -n kube-system
     
     # 重启各个节点上的kube-proxy pod
     kubectl get pod -n kube-system | grep kube-proxy | awk '{system("kubectl delete pod "$1" -n kube-system")}'
     
     # 使用下面命令可以查看ipvs的规则
     ipvsadm -L -n
     
     # 总结连接
     https://www.jianshu.com/p/d1ba8b910085
     ```
     
   - 启动kubelet

     ```shell
     # 启动kubelet
     systemctl start kubelet
     
     # 开机自启动
     systemctl enable kubelet
     ```

6. Master：检查Kubernetes节点状态 

   - 查看组件状态

     `````shell
     [root@Master-1 manifests]# kubectl get cs
     Warning: v1 ComponentStatus is deprecated in v1.19+
     NAME                 STATUS    MESSAGE             ERROR
     scheduler            Healthy   ok                  
     controller-manager   Healthy   ok                  
     etcd-0               Healthy   {"health":"true"}
     `````

     ![image-20201208151621356](./images/image-20201208151621356.png)

     如果出现这种情况，是/etc/kubernetes/manifests下的kube-controller-manager.yaml和kube-scheduler.yaml设置的默认端口是0，`- --port=0`，在文件中注释掉就可以了

   - 查看节点状态

     ```shell
     [root@Master-1 manifests]# kubectl get nodes
     NAME       STATUS     ROLES    AGE   VERSION
     master-1   NotReady   master   67m   v1.19.4
     ```

     可以发现状态是 `NotReady` ，也有是因为还没安装网络组件

   - 安装网络组件，只需要在 Master 节点上安装

     网络组件有：flannel、Calico，二选一

     ```shell
     # 安装flannel
     kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
     ```

     ```shell
     # 安装 Calico
     # 获取配置文件
     mkdir calico && cd calico
     wget https://docs.projectcalico.org/v3.8/manifests/calico.yaml
     
     # 修改配置文件
     # 找到 625 行左右的 192.168.0.0/16 ，并修改为我们初始化时配置的 10.10.0.0/16
     vim calico.yaml
     
     # 部署 Pod 网络组件
     kubectl apply -f calico.yaml
     ```

     查看节点状态

     ```shell
     [root@Master-1 ~]# kubectl get nodes
     NAME       STATUS   ROLES    AGE   VERSION
     master-1   Ready    master   82m   v1.19.4
     ```

   - 查看pod状态

     ```shell
     [root@Master-1 ~]# kubectl get pods -n kube-system
     NAME                               READY   STATUS    RESTARTS   AGE
     coredns-6c76c8bb89-kknpr           1/1     Running   0          84m
     coredns-6c76c8bb89-v4hcj           1/1     Running   0          84m
     etcd-master-1                      1/1     Running   0          84m
     kube-apiserver-master-1            1/1     Running   0          84m
     kube-controller-manager-master-1   1/1     Running   0          35m
     kube-flannel-ds-zmsj2              1/1     Running   0          6m7s
     kube-proxy-z25ht                   1/1     Running   0          84m
     kube-scheduler-master-1            1/1     Running   0          35m
     ```

     参数：

     -n  :  指定命名空间

     ​	kube-system是Kubernetes系统创建的对象的命名空间，系统级的pod都在这个命名空间中

     -o  :  指定显示格式

     ​	wide 是 显示pod的详细信息

     -A  :  代表显示所有命名空间中的pods

     ![image-20201208110617715](./images/image-20201208110617715.png)

   - 查看系统有哪些命名空间

     ```shell
     [root@Master-1 ~]# kubectl get ns
     NAME              STATUS   AGE
     default           Active   87m
     kube-node-lease   Active   87m
     kube-public       Active   87m
     kube-system       Active   87m
     ```

7. Nodes：kubeadm join     # 加入集群

   ```shell
   kubeadm join 192.168.10.201:6443 --token 34gosg.jo0ekn5mna56rypy \
       --discovery-token-ca-cert-hash sha256:cf33af10b85400f64643cde0b6282e46f99b830cc5b82072d5ed9bebadea40e8
   ```

   