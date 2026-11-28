import {
    c as q,
    u as z,
    r as o,
    j as e,
    g as M,
    L as V,
    R as N,
    a as P,
    M as W,
    d as G,
    F as _,
    B as J,
    b as X,
    e as F,
    f as Z,
    h as Q,
    P as ee,
    O as te,
    S as ne,
    i as se
} from "./index-DXjvarUE.js";
import {
    M as re,
    a as ae
} from "./index-BHq6nibb.js";
import {
    I as K
} from "./Input-BSLO96ua.js";
import {
    r as oe
} from "./index-DMeG4mV3.js";
import {
    C as U
} from "./index-VhfB2XoB.js";
import {
    M as ie
} from "./Modal-yjVlkq2e.js";
import {
    u as le
} from "./configuring-Dv0S3-bO.js";
import {
    u as B
} from "./useSearchInput-BOgW85Nv.js";
import {
    u as ce,
    F as de,
    C as H,
    a as me
} from "./index.esm-Xb98Jf0H.js";
import {
    F as he
} from "./FormalityAdvancedSearch-DNiEgsIN.js";
import {
    l as pe,
    a as xe
} from "./citizen-service-group-C19bvHD6.js";
import {
    F as O
} from "./dossier.constants-CELbC3ru.js";
import {
    b as ue
} from "./helper-C_K0ectp.js";
import {
    J as ge
} from "./JsonLd-Bzu5s73s.js";
import "./index-B2zhSoCJ.js";
import "./FloatingLabel-DqZ7tFbg.js";
import "./formality-B-l_tdKT.js";
import "./list-all-formality-by-citizen-JBPxlh1O.js";
import "./urlCommon-KXhUa2Yb.js";
import "./payment.constants-BqGs1AHa.js";
import "./pay-ins-violation-by-citizen-MoExXWAy.js";
import "./FormInput-CZRVctR2.js";
import "./RadioInput-28HLsRYR.js";
import "./FormSelect-BnJRLUSD.js";
import "./Select-SOl-q_xO.js";
import "./department-with-location-BGcn7uqn.js";
import "./category-B6w7Vuoo.js";
import "./useInfiniteQuery-yj5t5bkE.js";
import "./useIntersectionObserver-HSmx6NWM.js";
import "./useListDepartmentWithLocation-4RZpKCEb.js";
import "./subject-type-Cc8djTRJ.js";

function fe(n = {}) {
    return q("/configuring/news/list-home-by-citizen", n)
}

function ye(n) {
    return z({
        queryKey: ["home-news-by-citizen", n],
        queryFn: () => fe({
            limit: n
        }),
        staleTime: 300 * 1e3
    })
}
const be = () => {
        const [n, m] = o.useState(0), [x, f] = o.useState(3), [w, b] = o.useState(!0), i = o.useRef(null), {
            data: u,
            isLoading: v,
            error: d
        } = ye(10), s = (u == null ? void 0 : u.rows) ?? [], c = Math.max(0, s.length - x), g = o.useCallback(() => {
            const r = window.innerWidth;
            r < 640 ? f(1) : r < 1024 ? f(2) : f(3)
        }, []);
        o.useEffect(() => (g(), window.addEventListener("resize", g), () => window.removeEventListener("resize", g)), [g]);
        const l = o.useCallback(() => {
                m(r => r >= c ? 0 : r + 1)
            }, [c]),
            h = o.useCallback(() => {
                m(r => r <= 0 ? c : r - 1)
            }, [c]);
        o.useEffect(() => (w && s.length > 0 ? i.current = setInterval(() => {
            l()
        }, 4e3) : i.current && clearInterval(i.current), () => {
            i.current && clearInterval(i.current)
        }), [w, l, s.length]);
        const p = o.useCallback(() => b(!1), []),
            j = o.useCallback(() => b(!0), []);
        return d ? e.jsx("div", {
            className: "text-center py-10 text-red-500 bg-[url('/imgs/bg-news.jpg')] bg-cover bg-[right_center] bg-no-repeat",
            children: M(d)
        }) : v ? e.jsx("div", {
            className: "text-center py-10 text-gray-500 bg-[url('/imgs/bg-news.jpg')] bg-cover bg-[right_center] bg-no-repeat",
            children: "Đang tải tin tức..."
        }) : s.length ? e.jsx("div", {
            className: "bg-[url('/imgs/bg-news.jpg')] bg-cover bg-[right_center] bg-no-repeat",
            children: e.jsx("div", {
                className: "relative w-full flex justify-center app-container mx-auto max-w-5xl z-10 px-3.5",
                onMouseEnter: p,
                onMouseLeave: j,
                children: e.jsx("div", {
                    className: "w-full",
                    children: e.jsxs("div", {
                        className: "relative py-5 px-7.5",
                        children: [e.jsx("button", {
                            onClick: h,
                            className: "group absolute -left-1.5 top-1/2 transform -translate-y-1/2 z-20 p-2 transition-all duration-200 hover:scale-110 cursor-pointer",
                            "aria-label": "Previous slide",
                            children: e.jsx(re, {
                                className: "w-6 h-6 transition-colors duration-200 group-hover:text-primary"
                            })
                        }), e.jsx("button", {
                            onClick: l,
                            className: "group absolute -right-1.5 top-1/2 transform -translate-y-1/2 z-20 p-2 transition-all duration-200 hover:scale-110 cursor-pointer",
                            "aria-label": "Next slide",
                            children: e.jsx(ae, {
                                className: "w-6 h-6 transition-colors duration-200 group-hover:text-primary"
                            })
                        }), e.jsx("div", {
                            className: "overflow-hidden rounded-lg mb-2.5",
                            children: e.jsx("div", {
                                className: "flex transition-transform duration-500 ease-in-out",
                                style: {
                                    transform: `translateX(-${n*100/x}%)`,
                                    width: "100%"
                                },
                                children: s.map(r => e.jsx("div", {
                                    className: "flex-shrink-0",
                                    style: {
                                        width: `${100/x}%`
                                    },
                                    children: e.jsxs("div", {
                                        className: "bg-opacity-90 px-5 border-l border-[#e2e2e2] h-[100%] flex flex-col justify-between transition-all duration-300",
                                        children: [e.jsx(V, {
                                            to: `${N.ANNOUNCEMENT}/${r.id}`,
                                            children: e.jsx("div", {
                                                className: "text-base font-bold mb-3 leading-tight hover:text-primary transition-colors duration-200 line-clamp-2 cursor-pointer",
                                                children: r.title
                                            })
                                        }), r.shortDescription && e.jsx("p", {
                                            className: "text-xs text-gray-500 line-clamp-2 mb-2",
                                            children: r.shortDescription
                                        })]
                                    })
                                }, r.id))
                            })
                        })]
                    })
                })
            })
        }) : e.jsx("div", {
            className: "text-center py-10 text-gray-400 bg-[url('/imgs/bg-news.jpg')] bg-cover bg-[right_center] bg-no-repeat",
            children: "Không có tin tức nào."
        })
    },
    we = 240,
    ve = ({
        searchQuery: n,
        searchResults: m,
        isLoading: x,
        fetchError: f,
        onChange: w,
        handleSelectResult: b,
        renderList: i,
        showExtraAction: u,
        onExtraAction: v,
        extraActionLabel: d,
        emptyElement: s,
        showPopupLoading: c = !0,
        ...g
    }) => {
        const [l, h] = o.useState(!1), [p, j] = o.useState(null), r = o.useRef(null), T = o.useRef(null), S = o.useCallback(() => {
            h(!1), j(null)
        }, []);
        o.useEffect(() => {
            const a = t => {
                !r.current || !T.current || !r.current.contains(t.target) && !T.current.contains(t.target) && S()
            };
            return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a)
        }, [S]);
        const E = o.useCallback(() => {
            if (!r.current) return;
            const a = r.current.getBoundingClientRect(),
                t = window.innerHeight,
                y = t - a.bottom,
                R = a.top,
                A = y < we && R > y,
                L = {
                    position: "fixed",
                    left: a.left,
                    width: a.width,
                    zIndex: 9999,
                    top: A ? void 0 : a.bottom + 4,
                    bottom: A ? t - a.top + 4 : void 0
                };
            j(L)
        }, []);
        o.useEffect(() => {
            if (!l) return;
            const a = () => E();
            return window.addEventListener("scroll", a, !0), () => window.removeEventListener("scroll", a, !0)
        }, [l, E]);
        const I = a => {
                w(a), a && !l && (h(!0), E())
            },
            k = e.jsxs("div", {
                ref: T,
                style: p || {},
                className: "bg-white border border-gray-200 rounded-sm shadow-lg max-h-80 overflow-y-auto z-50",
                children: [x && c && e.jsx("div", {
                    className: "px-4 py-3 text-gray-500",
                    children: e.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [e.jsx("div", {
                            className: "animate-spin rounded-full h-4 w-4 border-b-2 border-primary"
                        }), e.jsx("span", {
                            children: "Đang tìm kiếm..."
                        })]
                    })
                }), !x && (m == null ? void 0 : m.length) > 0 && e.jsxs(e.Fragment, {
                    children: [m.map(a => e.jsx("div", {
                        onMouseDown: t => {
                            t.preventDefault(), b(a), S()
                        },
                        className: "px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0",
                        children: e.jsx("div", {
                            className: "flex flex-col",
                            children: i ? i(a) : e.jsx("span", {
                                className: "font-medium text-gray-900 line-clamp-1",
                                children: a.label
                            })
                        })
                    }, a.id)), m.length === 10 && u && e.jsx("div", {
                        className: "px-4 py-3 text-center border-t border-gray-100",
                        children: e.jsx("button", {
                            onMouseDown: a => {
                                a.preventDefault(), v == null || v(), S()
                            },
                            className: "text-primary hover:text-primary/80 font-medium",
                            children: d || "Xem tất cả kết quả"
                        })
                    })]
                }), !x && n && (!m || m.length === 0) && e.jsx(e.Fragment, {
                    children: s ? s() : e.jsxs("div", {
                        className: "px-4 py-6 text-center text-gray-500",
                        children: [e.jsx("div", {
                            className: "mb-2",
                            children: e.jsx(U, {
                                className: "w-8 h-8 mx-auto text-gray-300"
                            })
                        }), f ? e.jsx("span", {
                            className: "text-red-500",
                            children: M(f)
                        }) : e.jsxs(e.Fragment, {
                            children: [e.jsx("p", {
                                children: "Không tìm thấy kết quả phù hợp"
                            }), e.jsx("p", {
                                className: "text-sm mt-1",
                                children: "Thử từ khóa khác hoặc kiểm tra lại chính tả"
                            })]
                        })]
                    })
                })]
            });
        return e.jsxs("div", {
            className: "relative",
            ref: r,
            children: [e.jsx(K, {
                ...g,
                type: g.type || "text",
                onChange: I,
                onBlur: S,
                onFocus: () => {
                    (n == null ? void 0 : n.length) > 0 && (h(!0), E())
                },
                iconRight: g.iconRight,
                size: "md"
            }), l && n && oe.createPortal(k, document.body)]
        })
    },
    je = [{
        text: "Dịch vụ công trực tuyến",
        url: N.PUBLIC_SERVICES
    }, {
        text: "Thủ tục hành chính của Đảng",
        url: "#"
    }, {
        text: "Dịch vụ công liên thông: Khai sinh, Khai tử",
        url: "#"
    }],
    Ne = {
        WARD: "WARD"
    };

function Se() {
    const n = P(),
        [m, x] = o.useState(!1),
        [f, w] = o.useState(),
        {
            maxLen: b,
            normalize: i
        } = B(),
        u = ce({
            defaultValues: {
                keyword: "",
                province: "",
                provinceId: "",
                ministry: "",
                ministryId: "",
                categoryId: "",
                formalityTargetType: "",
                implementingLevel: "",
                formalityType: "",
                searchType: W,
                commune: Ne.WARD,
                showAdvanced: !1,
                agencyId: "",
                advancedKeyword: "",
                provinceCode: "",
                wardCode: ""
            }
        }),
        {
            control: v,
            handleSubmit: d,
            setValue: s,
            getValues: c
        } = u,
        g = o.useMemo(() => G(t => w(t), 500), []),
        l = t => {
            const y = i(t);
            s("keyword", y), g(y)
        },
        h = o.useMemo(() => ({
            q: f ?? "",
            limit: 10,
            lastId: "",
            order: "",
            categoryId: ""
        }), [c, f]),
        {
            data: p,
            isLoading: j,
            error: r
        } = le(h, {
            enabled: !!c("keyword")
        }),
        T = ((p == null ? void 0 : p.items) || []).map(t => ({
            id: t.id,
            label: t.name,
            value: t.code,
            type: t.type || _.STANDARD
        })),
        S = o.useCallback(() => {
            x(t => (t || s("advancedKeyword", i(c("keyword"))), !t))
        }, [s, c, i]),
        E = () => {
            const t = i(c("keyword")).trim(),
                y = new URLSearchParams;
            t && y.set("keyword", t), n(`${N.PUBLIC_SERVICES_DASHBOARD_RESULT}?${y.toString()}`)
        },
        I = t => {
            if (t.type === _.INTERCONNECTED) {
                n(F.formalityInterlinkedDetail(t.id));
                return
            }
            n(F.formalityDetail(t.id))
        },
        k = () => {
            const t = m ? i(c("advancedKeyword")).trim() : i(c("keyword")).trim();
            if (!m) {
                const C = new URLSearchParams;
                t && C.set("keyword", t), n(`${N.PUBLIC_SERVICES_DASHBOARD_RESULT}?${C.toString()}`);
                return
            }
            const y = c(),
                {
                    formalityType: R,
                    advancedKeyword: A
                } = y,
                L = Object.fromEntries(Object.entries(y).filter(([C, D]) => D != null && D !== "" && C !== "keyword" && C !== "advancedKeyword" && C !== "showAdvanced")),
                $ = {
                    null: N.SEARCH_FORMALITY_RESULT,
                    undefined: N.SEARCH_FORMALITY_RESULT,
                    "": N.SEARCH_FORMALITY_RESULT,
                    [_.STANDARD]: N.LIST_FORMALITY
                } [R] ?? N.LIST_FORMALITY_INTERLINKED,
                Y = new URLSearchParams({
                    ...L,
                    showAdvanced: "true",
                    keyword: i(A).trim()
                });
            n({
                pathname: $,
                search: `?${Y.toString()}`
            })
        },
        a = t => {
            d(k)(t)
        };
    return e.jsxs("div", {
        className: "bg-[url('/imgs/banner.jpg')] bg-cover bg-center bg-no-repeat",
        children: [e.jsx("div", {
            className: "app-container max-w-5xl py-8",
            children: e.jsx(de, {
                ...u,
                children: e.jsxs("form", {
                    onSubmit: a,
                    className: "mx-auto w-full",
                    children: [e.jsx(H, {
                        name: "keyword",
                        control: v,
                        render: ({
                            field: t
                        }) => e.jsx(ve, {
                            ...t,
                            value: t.value || "",
                            searchQuery: c("keyword"),
                            searchResults: T,
                            isLoading: j,
                            onChange: l,
                            handleSelectResult: I,
                            placeholder: "Nhập từ khoá tìm kiếm thủ tục hành chính",
                            maxLength: b,
                            size: "md",
                            inputPadding: "max-sm:px-2 max-sm:py-2 max-sm:text-[13px]",
                            renderList: Ce,
                            showExtraAction: !0,
                            onExtraAction: E,
                            fetchError: r,
                            iconRight: e.jsxs("div", {
                                className: "flex h-full rounded-r-sm overflow-hidden text-base shrink-0",
                                children: [e.jsx("button", {
                                    type: "button",
                                    className: "relative flex items-center gap-1 md:gap-2 max-sm:px-1 px-2 md:px-5 py-2 font-medium bg-white transition hover:text-primary before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-[60%] before:bg-gray-300 whitespace-nowrap",
                                    onClick: S,
                                    children: e.jsx("span", {
                                        children: "Tìm kiếm nâng cao"
                                    })
                                }), e.jsx("button", {
                                    type: "submit",
                                    className: "flex items-center justify-center gap-2 px-3 md:px-5 h-full font-medium rounded-r-sm transition bg-[#f5f5f5] text-[#1E2F41] hover:text-white hover:bg-[#b76a46]",
                                    children: e.jsx(U, {
                                        size: 20
                                    })
                                })]
                            })
                        })
                    }), e.jsx(ie, {
                        isOpen: m,
                        onClose: () => x(!1),
                        size: "lg",
                        centerModal: !1,
                        showHeader: !1,
                        showCloseButton: !0,
                        children: e.jsxs("div", {
                            className: "p-4",
                            children: [e.jsx(Ee, {
                                onSubmit: k
                            }), e.jsx("div", {
                                className: "mt-4",
                                children: e.jsx(J, {
                                    fill: !0,
                                    color: "primary",
                                    className: "w-full h-10",
                                    type: "submit",
                                    onClick: () => {
                                        d(k)()
                                    },
                                    children: "Tìm kiếm"
                                })
                            })]
                        })
                    })]
                })
            })
        }), e.jsx("div", {
            className: "app-container mx-auto max-w-5xl pb-8",
            children: e.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4",
                children: je.map((t, y) => e.jsx(X, {
                    to: t.url,
                    rel: "noopener noreferrer",
                    className: "bg-gold shadow-xl text-center text-lg font-semibold px-4 py-2 rounded-sm hover:bg-gold/80 transition-colors flex items-center justify-center",
                    children: t.text
                }, y))
            })
        })]
    })
}
const Ee = ({
        onSubmit: n
    }) => {
        const {
            control: m,
            handleSubmit: x
        } = me(), {
            maxLen: f,
            normalize: w
        } = B(), b = () => {
            x(n)()
        };
        return e.jsxs(e.Fragment, {
            children: [e.jsxs("div", {
                className: "mt-4",
                children: [e.jsx("div", {
                    className: "text-xl mb-3.5 font-semibold",
                    children: "Nhập từ khoá tìm kiếm"
                }), e.jsx(H, {
                    name: "advancedKeyword",
                    control: m,
                    render: ({
                        field: i
                    }) => e.jsx(K, {
                        ...i,
                        placeholder: "Nhập từ khoá tìm kiếm thủ tục hành chính",
                        maxLength: f,
                        onChange: u => i.onChange(w(u)),
                        onKeyDown: u => {
                            u.key === "Enter" && (u.preventDefault(), b())
                        }
                    })
                })]
            }), e.jsx("div", {
                className: "mt-4",
                children: e.jsx(he, {
                    layout: "LIST_PAGE",
                    showAdvanced: !0
                })
            })]
        })
    },
    Ce = n => e.jsxs(e.Fragment, {
        children: [e.jsx("span", {
            className: "font-medium text-gray-900 line-clamp-1",
            children: n.label
        }), e.jsxs("span", {
            className: "text-sm text-gray-500 mt-1",
            children: ["Mã: ", n.value]
        })]
    });

function Te() {
    const n = P(),
        {
            data: m = {
                citizenGroups: [],
                corporateGroups: []
            },
            isLoading: x,
            isError: f,
            error: w
        } = z({
            queryKey: ["service-groups"],
            queryFn: async () => {
                const d = await pe({});
                return Array.isArray(d) ? {
                    citizenGroups: d.filter(s => s.type === "CITIZEN"),
                    corporateGroups: d.filter(s => s.type === "CORPORATE")
                } : {
                    citizenGroups: [],
                    corporateGroups: []
                }
            }
        }),
        {
            citizenGroups: b,
            corporateGroups: i
        } = m,
        u = async (d, s, c = !1) => {
            const g = c ? "/dvc-chi-tiet-nhom-su-kien-cho-cong-dan" : "/dvc-chi-tiet-nhom-su-kien-cho-doanh-nghiep",
                l = c ? O.VIETNAMESE_CITIZEN : O.ENTERPRISE;
            try {
                const h = await xe({
                        parentId: d
                    }),
                    p = [...b, ...i].find(r => r.id === d),
                    j = (p == null ? void 0 : p.icon) || null;
                n(`${g}/${d}`, {
                    state: {
                        data: h || [],
                        parentName: s,
                        parentIcon: j,
                        formalityTargetType: l
                    }
                })
            } catch {
                const h = [...b, ...i].find(j => j.id === d),
                    p = (h == null ? void 0 : h.icon) || null;
                n(`${g}/${d}`, {
                    state: {
                        data: [],
                        parentName: s,
                        parentIcon: p,
                        formalityTargetType: l
                    }
                })
            }
        }, v = ({
            title: d,
            serviceGroups: s,
            color: c,
            isCitizen: g = !1
        }) => e.jsxs("div", {
            className: "w-full pt-4 sm:pt-6 md:pt-8",
            children: [e.jsx("h2", {
                className: "text-lg sm:text-xl md:text-2xl pb-2 sm:pb-3 md:pb-3.5 font-semibold text-center text-primary border-b-4 border-primary uppercase mb-2 sm:mb-2.5",
                children: d
            }), e.jsxs("div", {
                className: "flex flex-wrap flex-col",
                children: [x && e.jsx("div", {
                    className: "text-center py-4 sm:py-5 text-sm sm:text-base",
                    children: "Đang tải dữ liệu..."
                }), f && e.jsx("div", {
                    className: "text-center text-red-600 py-4 sm:py-5 text-sm sm:text-base",
                    children: M(w)
                }), !f && !x && !(s != null && s.length) && e.jsx("div", {
                    className: "text-center py-4 sm:py-5 text-sm sm:text-base",
                    children: "Không có dữ liệu."
                }), s.map(l => {
                    var h, p;
                    return e.jsxs("button", {
                        onClick: () => {
                            u(l.id, l.name, g)
                        },
                        className: "px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-100 my-1 sm:my-1.5 text-base sm:text-lg md:text-xl flex items-center space-x-3 sm:space-x-4 hover:bg-primary/10 active:bg-primary/20 transition-colors text-left cursor-pointer w-full sm:w-auto",
                        children: [l.icon ? e.jsx("img", {
                            src: `data:image/png;base64,${ue(l.icon)}`,
                            alt: l.name || ((h = l.data) == null ? void 0 : h.note) || "Service group",
                            className: "w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                        }) : e.jsx("span", {
                            className: Q("text-lg sm:text-2xl flex-shrink-0", c === "secondary" ? "text-secondary" : "text-teal-800"),
                            children: e.jsx(Z, {})
                        }), e.jsx("span", {
                            className: "text-gray-600 text-base line-clamp-2",
                            children: l.name || ((p = l.data) == null ? void 0 : p.note)
                        })]
                    }, l.id)
                })]
            })]
        });
    return e.jsx("div", {
        className: "app-container mx-auto max-w-5xl px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12",
        children: e.jsxs("div", {
            className: "flex flex-col lg:flex-row lg:justify-center w-full gap-4 sm:gap-6 md:gap-8 lg:gap-12",
            children: [e.jsx("div", {
                className: "w-full lg:w-1/2",
                children: v({
                    title: "Công dân",
                    serviceGroups: b,
                    color: "green-600",
                    isCitizen: !0
                })
            }), e.jsx("div", {
                className: "w-full lg:w-1/2",
                children: v({
                    title: "Doanh nghiệp",
                    serviceGroups: i,
                    color: "secondary"
                })
            })]
        })
    })
}

function at() {
    var n;
    return e.jsxs("div", {
        className: "",
        children: [e.jsx(ge, {
            data: {
                "@context": "https://schema.org",
                "@type": "GovernmentOrganization",
                name: se,
                url: ne,
                logo: te,
                description: (n = ee[N.HOME]) == null ? void 0 : n.description
            }
        }), e.jsx(Se, {}), e.jsx(be, {}), e.jsx(Te, {})]
    })
}
export {
    at as
    default
};